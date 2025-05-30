import React, { useState } from 'react';
import "./dynamic-table.scss";

interface Column {
    key: string;
    label: string;
    visible?: boolean;
    sortable?: boolean;
    render?: (value: any, row: Record<string, any>) => React.ReactNode;
}

interface DynamicTableProps {
    columns: Column[];
    data: Record<string, any>[];
}

export const DynamicTable: React.FC<DynamicTableProps> = ({ columns, data }) => {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
    const [search, setSearch] = useState('');

    const visibleColumns = columns.filter(col => col.visible !== false);

    const sortedData = [...data].sort((a, b) => {
        if (!sortConfig) return 0;
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const filteredData = sortedData.filter(row =>
        visibleColumns.some(col =>
            String(row[col.key] ?? '')
                .toLowerCase()
                .includes(search.toLowerCase())
        )
    );

    const requestSort = (key: string) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig?.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    return (
        <div className="table-wrapper">
            <input
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="search-input"
            />
            <table className="dynamic-table">
                <thead>
                    <tr>
                        {visibleColumns.map(col => (
                            <th key={col.key} onClick={() => col.sortable && requestSort(col.key)}>
                                {col.label}
                                {sortConfig?.key === col.key && (sortConfig.direction === 'asc' ? ' 🔼' : ' 🔽')}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, idx) => (
                        <tr key={idx}>
                            {visibleColumns.map(col => (
                                <td key={col.key}>
                                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
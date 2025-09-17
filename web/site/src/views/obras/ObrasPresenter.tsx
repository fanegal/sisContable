import { Chip } from "@/components/atoms/Chip/Chip";
import { environment } from "@/environment/environment.prod";
import { httpService } from "@/services/HttpAppService";
import { dateTimeToFullFormat, Icon, LoadingService } from "common-lib";
import { useEffect, useState } from "react";

export function useObrasPresenter() {
    const [renderOperations, setRenderOperations] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
        orderBy: "id",
        orderDir: "asc"
    });

    useEffect(() => {
        loadData();
        let search: any = document.getElementsByClassName("search-content");
        if (search && search[0]?.children[1]?.children?.length > 1) {
            search[0].children[1].children[0].remove();
        }
    }, [pagination.page, pagination.limit, pagination.orderBy, pagination.orderDir]);

    const columns = [
        {
            key: 'created', label: 'Fecha', sortable: true, render: (v, row) => {
                console.log(row, dateTimeToFullFormat(row.created));
                return dateTimeToFullFormat(row.created);
            }
        },
        { key: 'fileName', label: 'Nombre del archivo', sortable: true },
        { key: 'status', label: 'Estatus', render: val => <Chip label={val} status="success" />, sortable: true },
        {
            key: 'action',
            label: 'Acción',
            render: (a, b) => (
                <div className="action-table-btn-container">
                    <button className="action-btn-table">
                        <Icon name="edit" />
                    </button>
                </div>
            ),
            sortable: false
        }
    ];

    async function loadData() {
        setLoading(true);
        LoadingService.show();
        try {
            const response: any = await httpService.post(environment.getModulosContablesByPagination, {
                page: pagination.page,
                limit: pagination.limit,
                order_by: pagination.orderBy,
                order_dir: pagination.orderDir,
                filter_logic: "or",
                filters: {},
                fixed_filters: { 
                    type: "OBRAS" 
                },
                fields: "id,created,file_name,ente,year,type,status,json_data"
            });

            const items = response?.data?.items ?? [];
            const paginationResp = response?.data?.pagination ?? {};

            setData(items);
            setPagination(prev => ({
                ...prev,
                total: paginationResp.total ?? prev.total,
                totalPages: paginationResp.pages ?? prev.totalPages,
                page: paginationResp.page ?? prev.page,
                limit: paginationResp.limit ?? prev.limit
            }));
        } catch (error) {
            console.error("Error cargando modulos contables", error);
        } finally {
            LoadingService.hide();
            setLoading(false);
        }
    }

    function prevPage() {
        if (pagination.page > 1) {
            setPagination(prev => ({ ...prev, page: prev.page - 1 }));
        }
    }

    function nextPage() {
        if (pagination.page < pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: prev.page + 1 }));
        }
    }

    function goToPage(p: number) {
        if (p >= 1 && p <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: p }));
        }
    }

    function onLimitChange(newLimit: number) {
        setPagination(prev => ({ ...prev, page: 1, limit: newLimit }));
    }

    function onSortChange(orderBy: string, orderDir: "asc" | "desc") {
        setPagination(prev => ({ ...prev, page: 1, orderBy, orderDir }));
    }

    function onSubmit() {
        console.log("click demo");
    }

    return {
        onSubmit,
        renderOperations,
        setRenderOperations,
        columns,
        data,
        loading,
        pagination,
        prevPage,
        nextPage,
        goToPage,
        onLimitChange,
        onSortChange
    };
}

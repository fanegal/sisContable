import { Icon } from "common-lib";
import { useState } from "react";

export function useObrasPresenter() {

    const [renderOperations, setRenderOperations] = useState(false);

    const columns = [
        { key: 'date', label: 'Fecha', sortable: true },
        { key: 'fileName', label: 'Nombre del archivo', sortable: true },
        { key: 'status', label: 'Estatus', render: val => <a href={`tel:${val}`}>{val}</a>, sortable: true },
        {
            key: 'action', label: 'Acción', render: (a, b) => {
                console.log(a, b);
                return <button>
                    <Icon name="edit" />
                </button>
            }, sortable: true
        }
    ];

    function onSubmit() {
        console.log("click demo");
    }

    return {
        onSubmit,
        renderOperations,
        setRenderOperations,
        columns
    }
}
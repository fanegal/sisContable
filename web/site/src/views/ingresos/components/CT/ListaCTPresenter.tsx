import { Icon } from "common-lib";
import { useEffect, useState } from "react";

export function useListaCTPresenter() {

    const [renderOperations, setRenderOperations] = useState(false);

    const columns = [
        { key: 'date', label: 'Fecha', sortable: true },
        { key: 'recibo', label: 'Recibo', sortable: true },
        { key: 'concepto', label: 'Concepto', sortable: true },
        { key: 'contribuyente', label: 'Contribuyente', sortable: true },
        { key: 'precio', label: 'Precio', sortable: true },
        { key: 'cfdi', label: 'CFDI', sortable: true },
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

    useEffect(() => {
        let search: any = document.getElementsByClassName("search-content");
        if (search) {
            console.log(search[0].children[1].children[0]);

            if (search[0].children[1].children?.length > 1) {
                search[0].children[1].children[0].remove()
            }
        }
    }, []);

    return {
        onSubmit,
        renderOperations,
        setRenderOperations,
        columns
    }
}
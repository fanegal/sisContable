import { Icon } from "common-lib";
import { useEffect, useState } from "react";

export function useListaRCPresenter() {

    const [renderOperations, setRenderOperations] = useState(false);

    const columns = [
        { key: 'date', label: 'Fecha', sortable: true },
        { key: 'cuenta', label: 'Cuenta', sortable: true },
        { key: 'year', label: 'Año', sortable: true },
        { key: 'imp', label: 'Impuesto', sortable: true },
        { key: '´norbotes', label: 'NO.RBO.TES.', sortable: true },
        { key: 'contribuyente', label: 'Contribuyente', sortable: true },
        { key: 'cobro', label: 'Cobro', sortable: true },
        { key: 'recargos', label: 'Recargos', sortable: true },
        { key: 'boleta', label: 'No. Boleta', sortable: true },
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
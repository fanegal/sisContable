import {Icon} from "common-lib";
import { useState } from "react";

export function useListaRCPresenter() {

    const[renderOperations,setRenderOperations] = useState(false);

    const columns = [
        { key: 'date', label: 'Fecha', sortable: true },
        { key: 'recibo', label: 'Recibo', sortable: true },
        { key: 'tipo', label: 'Tipo', sortable: true },
        { key: 'folio', label: 'Folio', sortable: true },
        { key: 'nombre', label: 'Nombre', sortable: true },
        { key: 'cr', label: 'Cobro Real', sortable: true },
        { key: 'derechoorig', label: 'Derecho', sortable: true },
        { key: 'cfdi', label: 'CFDI', sortable: true },
        { key: 'action', label: 'Acción', render: (a, b) => {
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
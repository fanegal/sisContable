import { Icon } from "common-lib";
import { useEffect, useState } from "react";

export function useIngresosPresenter() {

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

    useEffect(()=>{
        let search:any = document.getElementsByClassName("search-content");
        if(search){
            console.log(search[0].children[1].children[0]);
            
            if(search[0].children[1].children?.length>1){
                search[0].children[1].children[0].remove()
            }
        }
    },[]);

    return {
        onSubmit,
        renderOperations,
        setRenderOperations,
        columns
    }
}
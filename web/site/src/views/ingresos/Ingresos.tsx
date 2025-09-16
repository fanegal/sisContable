import { Content, DynamicTable, Tabs } from "common-lib";
import "./ingresos.scss";
import { useIngresosPresenter } from "./IngresosPresenter";
import { IngresosTransactions } from "./components/IngresosTransactions/IngresosTransactions";
import { Fragment } from "react/jsx-runtime";
export default function Ingresos({ }) {

    const { onSubmit, renderOperations,setRenderOperations, columns } = useIngresosPresenter();

    return <div className="gral-content">
    
            {renderOperations ? <IngresosTransactions /> : <DynamicTable
                selectable={true}
                singleSelection={true}
                moduleTitle="Ingresos"
                keyTag="email"
                columns={columns}
                data={[
                    { date: '20/12/Dic', fileName: 'Obras.xlsx', status: 'Capturado' },
                    { name: 'Luis', email: 'luis@mail.com', phone: '987654321' }
                ]}
                onSelectionChange={(selected) => {
                    console.log("Seleccionados:", selected);
                }}
                actions={[
                    {
                        title: "Carga manual",
                        icon: "border_color",
                        action: () => {
                            setRenderOperations(true);
                        },
                    },
                    {
                        title: "Editar cupón",
                        icon: "delete",
                        action: () => console.log("Editar"),
                    },
                ]}
            />}
        </div>
}
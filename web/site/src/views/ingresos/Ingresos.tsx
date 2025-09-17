import { Content, DynamicTable, Tabs } from "common-lib";
import "./ingresos.scss";
import { useIngresosPresenter } from "./IngresosPresenter";
import { IngresosTransactions } from "./components/IngresosTransactions/IngresosTransactions";
import { Fragment } from "react/jsx-runtime";
export default function Ingresos({ }) {

    const { onSubmit, renderOperations, setRenderOperations, columns } = useIngresosPresenter();

    return <div className="gral-content">

        {renderOperations ? <IngresosTransactions setRenderOperations={setRenderOperations}/> : <DynamicTable
            selectable={true}
            singleSelection={true}
            moduleTitle=""
            keyTag="email"
            columns={columns}
            data={[
                { date: '20/12/Dic', fileName: 'PARA LLENAR INGRESOS.xlsx', status: 'Capturado' },

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
                    title: "Carga masiva",
                    icon: "Upload",
                    action: () => console.log("Editar"),
                },
            ]}
        />}
    </div>
}
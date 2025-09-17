import { Content, DynamicTable, Tabs } from "common-lib";
import "./gastos.scss";
import { useGastosPresenter } from "./GastosPresenter";
import { GastosTransactions } from "./components/GastosTransactions/GastosTransactions";
export default function Gastos({ }) {

    const { onSubmit, renderOperations, setRenderOperations, columns } = useGastosPresenter();

    return <div className="gral-content">
        {renderOperations ? <GastosTransactions setRenderOperations={setRenderOperations} /> : <DynamicTable
            selectable={true}
            singleSelection={true}
            moduleTitle=""
            keyTag="email"
            columns={columns}
            data={[
                { date: '20/12/Dic', fileName: 'GastosDiciembre.xlsx', status: 'Capturado' },

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
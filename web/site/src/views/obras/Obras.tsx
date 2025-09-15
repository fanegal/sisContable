import { Content, DynamicTable, Tabs } from "common-lib";
import "./obras.scss";
import { useObrasPresenter } from "./ObrasPresenter";
import { ObraTransactions } from "./components/ObraTransactions/ObraTransactions";
export default function Obras({ }) {

    const { onSubmit, renderOperations, setRenderOperations, columns } = useObrasPresenter();

    return <Content>

        {renderOperations ? <ObraTransactions /> : <DynamicTable
            selectable={true}
            singleSelection={true}
            moduleTitle="Obras"
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
                    title: "Carga masiva",
                    icon: "border_color",
                    action: () => console.log("Editar"),
                },
            ]}
        />}
    </Content>
}
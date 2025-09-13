import { Content, DynamicTable, Tabs } from "common-lib";
import "./obras.scss";
import { useObrasPresenter } from "./ObrasPresenter";
import { ObraTransactions } from "./components/ObraTransactions/ObraTransactions";
export default function Obras({ }) {

    const { onSubmit, renderOperations, setRenderOperations } = useObrasPresenter();

    return <Content>

        {renderOperations ? <ObraTransactions /> : <DynamicTable
            selectable={true}
            singleSelection={true}
            moduleTitle="Obras"
            keyTag="email"
            columns={[
                { key: 'name', label: 'Nombre', sortable: true },
                { key: 'email', label: 'Correo', sortable: true },
                { key: 'phone', label: 'Teléfono', render: val => <a href={`tel:${val}`}>{val}</a>, sortable: true }
            ]}
            data={[
                { name: 'Ana', email: 'ana@mail.com', phone: '123456789' },
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
    </Content>
}
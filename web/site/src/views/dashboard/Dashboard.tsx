import { Content } from "@/components/content/Content";
import { DynamicTable } from "@/components/table/DynamicTable";
import AlertService from "@/services/AlertService";

export default function Dashboard() {
  return <Content>
    {/* <button onClick={() => {
      AlertService.show({
        title: 'Confirmar acción',
        message: (
          <div>
            <p>¿Estás seguro de continuar?</p>
            <strong>Esto no se puede deshacer.</strong>
          </div>
        ),
        cssClass: 'sidebar-alert',
        acceptAction: () => console.log('Confirmado'),
        cancelAction: () => console.log('Cancelado'),
        hasCancel: true,
      });
    }}>click</button> */}
    <DynamicTable
      selectable={true}
      singleSelection={true}
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
    />

  </Content>
}

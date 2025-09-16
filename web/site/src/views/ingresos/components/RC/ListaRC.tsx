import { Content, DynamicTable, Tabs } from "common-lib";
import "../../ingresos.scss";
import { useListaRCPresenter } from "./ListaRCPresenter";
import { RC } from "./components/RC";

export function ListaRC({ }) {

  const { onSubmit, renderOperations, setRenderOperations, columns } = useListaRCPresenter();

  return <>

    {renderOperations ? <RC setRenderOperations={setRenderOperations}/> : <DynamicTable
      selectable={true}
      singleSelection={true}
      moduleTitle="Ingresos"
      keyTag="email"
      columns={columns}
      data={[
        {
          date: '02/12/2024',
          recibo: '0200',
          tipo: 'EXT.NAC.',
          folio: '5547260',
          nombre: 'MIGUEL TEUTLE PEREZ',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE'
        },
        {
          date: '02/12/2024',
          recibo: '0201',
          tipo: 'EXT.NAC.',
          folio: '5547261',
          nombre: 'LUIS PEDRO ROJAS',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE'
        },
        {
          date: '02/12/2024',
          recibo: '0201',
          tipo: 'EXT.NAC.',
          folio: '5547262',
          nombre: 'LUIS PEDRO ROJAS',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE'
        },
        {
          date: '02/12/2024',
          recibo: '0201',
          tipo: 'EXT.NAC.',
          folio: '5547263',
          nombre: 'MARIA ELIZABETH FERNANDEZ SANTIAGO',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE'
        },
        {
          date: '02/12/2024',
          recibo: '0203',
          tipo: 'EXT.NAC.',
          folio: '5547264',
          nombre: 'HILDA EVELIA GRANDE RFINCON',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE'
        },
        {
          date: '02/12/2024',
          recibo: '0203',
          tipo: 'EXT.NAC.',
          folio: '5547265',
          nombre: 'HILDA EVELIA GRANDE RFINCON',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE'
        },
        {
          date: '02/12/2024',
          recibo: '0208',
          tipo: 'FOR.NAC.',
          folio: '30453109',
          nombre: 'EMMANUEL ARANDA ALLENDE',
          cr: '$0.00',
          derechoorig: '$0.00',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE'
        },
        {
          date: '02/12/2024',
          recibo: '0209',
          tipo: 'EXT.NAC.',
          folio: '5547266',
          nombre: 'LORENZO ROMERO ROMERO',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE'
        },
        {
          date: '02/12/2024',
          recibo: '0210',
          tipo: 'EXT.MAT.',
          folio: '30293768',
          nombre: 'NICOLAS RAMIREZ ALPIZAR',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE'
        },
        {
          date: '04/12/2024',
          recibo: '0214',
          tipo: 'EXT.NAC.',
          folio: '5547267',
          nombre: 'ELADIO TEPOZ RAMIREZ',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '3137D306-AB0D-4BEA-ABDB-F92C354D4932'
        },
        {
          date: '04/12/2024',
          recibo: '0215',
          tipo: 'EXT.DEF.',
          folio: '28979219',
          nombre: 'MIGUEL TEPOX FLORES',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '3137D306-AB0D-4BEA-ABDB-F92C354D4932'
        },
        {
          date: '04/12/2024',
          recibo: '0215',
          tipo: 'EXT.DEF.',
          folio: '28979220',
          nombre: 'MIGUEL TEPOX FLORES',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '3137D306-AB0D-4BEA-ABDB-F92C354D4932'
        },
        {
          date: '04/12/2024',
          recibo: '0215',
          tipo: 'EXT.DEF.',
          folio: '28979221',
          nombre: 'MIGUEL TEPOX FLORES',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: '3137D306-AB0D-4BEA-ABDB-F92C354D4932'
        },
        {
          date: '05/12/2024',
          recibo: '0219',
          tipo: 'EXT.NAC.',
          folio: '5547268',
          nombre: 'AGUSTIN TLACZANI AGUILAR',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: 'CFD25271-3D4C-4726-B643-98DEE591E49B'
        },
        {
          date: '05/12/2024',
          recibo: '0224',
          tipo: 'EXT.NAC.',
          folio: '5547269',
          nombre: 'FRANCISCA GONZALEZ ROJAS',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: 'CFD25271-3D4C-4726-B643-98DEE591E49B'
        },
        {
          date: '05/12/2024',
          recibo: '0225',
          tipo: 'FOR.DIV.',
          folio: '30444809',
          nombre: 'MANUEL BUENO LOZANO',
          cr: '$590.00',
          derechoorig: '$944.00',
          cfdi: 'CFD25271-3D4C-4726-B643-98DEE591E49B'
        },
        {
          date: '06/12/2024',
          recibo: '0228',
          tipo: 'EXT.NAC.',
          folio: '5547270',
          nombre: 'JORGE TEPOX FLORES',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: 'D069E759-49D2-47F9-9952-9D0981BE7CFC'
        },
        {
          date: '06/12/2024',
          recibo: '0230',
          tipo: 'EXT.MAT.',
          folio: '30293769',
          nombre: 'MAURO GRANDE MONTIEL',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: 'D069E759-49D2-47F9-9952-9D0981BE7CFC'
        },
        {
          date: '06/12/2024',
          recibo: '0231',
          tipo: 'EXT.NAC.',
          folio: '5547271',
          nombre: 'MARIA HILARIA AGUILAR TLACZANI',
          cr: '$150.00',
          derechoorig: '$220.00',
          cfdi: 'D069E759-49D2-47F9-9952-9D0981BE7CFC'
        }
      ]}
      onSelectionChange={(selected) => {
        console.log("Seleccionados:", selected);
      }}
      singleAction={() => {
        setRenderOperations(true);
      }}
      actions={[
        {
          title: "Agregar",
          icon: "border_color",
          action: () => {
            setRenderOperations(true);
          },
        }
      ]}
    />}
  </>
}
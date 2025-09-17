import { Content, DynamicTable, Tabs } from "common-lib";
import "../../ingresos.scss";
import { useListaCTPresenter } from "./ListaCTPresenter";
import { CT } from "./components/CT";

export function ListaCT({ }) {

  const { onSubmit, renderOperations, setRenderOperations, columns } = useListaCTPresenter();

  return <>

    {renderOperations ? <CT setRenderOperations={setRenderOperations} /> : <DynamicTable
      selectable={true}
      singleSelection={true}
      moduleTitle=""
      keyTag="email"
      columns={columns}
      data={[
        {
          date: "02/12/2024",
          recibo: "0202",
          concepto: "COPIA FIEL",
          contribuyente: "MARIA ELIZABETH FERNANDEZ SANTIAGO",
          precio: "$122.00",
          cfdi: "9CD00687-FF7F4E93-9396-D2CC08048ABE",
        },
        {
          date: "02/12/2024",
          recibo: "0204",
          concepto: "COPIA FIEL",
          contribuyente: "MARIA AMADA ROMERO VAZQUEZ",
          precio: "$122.00",
          cfdi: "9CD00687-FF7F4E93-9396-D2CC08048ABE",
        },
        {
          date: "02/12/2024",
          recibo: "0205",
          concepto: "COPIA FIEL",
          contribuyente: "ELISEA LIMON TORRES",
          precio: "$122.00",
          cfdi: "9CD00687-FF7F4E93-9396-D2CC08048ABE",
        },
        {
          date: "02/12/2024",
          recibo: "0207",
          concepto: "COPIA FIEL",
          contribuyente: "GUISELA VALENCIA VARELA",
          precio: "$122.00",
          cfdi: "9CD00687-FF7F4E93-9396-D2CC08048ABE",
        },
        {
          date: "03/12/2024",
          recibo: "0211",
          concepto: "COPIA FIEL",
          contribuyente: "MARIA TERESA GONZALEZ ROJAS",
          precio: "$122.00",
          cfdi: "11832B0D-05FE-4061-A53F-E1363B74381F",
        },
        {
          date: "03/12/2024",
          recibo: "0212",
          concepto: "COPIA FIEL",
          contribuyente: "MIGUEL COYOTL ARIAS",
          precio: "$122.00",
          cfdi: "11832B0D-05FE-4061-A53F-E1363B74381F",
        },
        {
          date: "04/12/2024",
          recibo: "0213",
          concepto: "COPIA FIEL",
          contribuyente: "CATALINA TAPIA COYOTL",
          precio: "$122.00",
          cfdi: "3137D306-AB0D-4BEA-ABDB-F92C354D4932",
        },
        {
          date: "04/12/2024",
          recibo: "0216",
          concepto: "COPIA FIEL",
          contribuyente: "CANDELARIA VALENTE CASTRO",
          precio: "$122.00",
          cfdi: "3137D306-AB0D-4BEA-ABDB-F92C354D4932",
        },
        {
          date: "04/12/2024",
          recibo: "0217",
          concepto: "COPIA FIEL",
          contribuyente: "TIBURCIO LUIS PALMA CIACA",
          precio: "$122.00",
          cfdi: "3137D306-AB0D-4BEA-ABDB-F92C354D4932",
        },
        {
          date: "05/12/2024",
          recibo: "0218",
          concepto: "COPIA FIEL",
          contribuyente: "OFELIA AHUEHUETL",
          precio: "$122.00",
          cfdi: "3137D306-AB0D-4BEA-ABDB-F92C354D4933",
        },
        {
          date: "05/12/2024",
          recibo: "0220",
          concepto: "COPIA FIEL",
          contribuyente: "TOMAS GONZALEZ ROMERO",
          precio: "$122.00",
          cfdi: "CFD25271-3D4C-4726-B643-98DEE591E49B",
        },
        {
          date: "05/12/2024",
          recibo: "0221",
          concepto: "COPIA FIEL",
          contribuyente: "ALBERTO TAPIA COYOTL",
          precio: "$122.00",
          cfdi: "CFD25271-3D4C-4726-B643-98DEE591E49B",
        },
        {
          date: "05/12/2024",
          recibo: "0222",
          concepto: "COPIA FIEL",
          contribuyente: "PLACIDA VARGAS CEACA",
          precio: "$122.00",
          cfdi: "CFD25271-3D4C-4726-B643-98DEE591E49B",
        },
        {
          date: "05/12/2024",
          recibo: "0223",
          concepto: "COPIA FIEL",
          contribuyente: "DAVID ESPINOZA GUARNEROS",
          precio: "$122.00",
          cfdi: "CFD25271-3D4C-4726-B643-98DEE591E49B",
        },
        {
          date: "06/12/2024",
          recibo: "0226",
          concepto: "COPIA FIEL",
          contribuyente: "PEDRO MENDEZ NEZAHUATL",
          precio: "$122.00",
          cfdi: "D069E759-49D2-47F9-9952-9D0981BE7CFC",
        },
        {
          date: "06/12/2024",
          recibo: "0229",
          concepto: "COPIA FIEL",
          contribuyente: "JORGE LUIS TEUTLE GUTIERREZ",
          precio: "$122.00",
          cfdi: "D069E759-49D2-47F9-9952-9D0981BE7CFC",
        },
        {
          date: "06/12/2024",
          recibo: "0232",
          concepto: "COPIA FIEL",
          contribuyente: "TOMASA VALIENTE AHUEHUETL",
          precio: "$122.00",
          cfdi: "D069E759-49D2-47F9-9952-9D0981BE7CFC",
        },
      ]}
      onSelectionChange={(selected) => {
        console.log("Seleccionados:", selected);
      }}
      singleAction={() => { setRenderOperations(true); }}
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
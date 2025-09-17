import { Content, DynamicTable, Tabs } from "common-lib";
import "../../ingresos.scss";
import { useListaRCPresenter } from "./ListaPDPresenter";
import { PD } from "./components/PD";

export function ListaPD({ }) {

  const { onSubmit, renderOperations, setRenderOperations, columns } = useListaRCPresenter();

  return <>

    {renderOperations ? <PD setRenderOperations={setRenderOperations} /> : <DynamicTable
      selectable={true}
      singleSelection={true}
      moduleTitle=""
      keyTag="email"
      columns={columns}
      data={[
        {
          date: '02/12/2024',
          cuenta: '50726',
          year: '2024',
          imp: 'RUSTICO',
          '´norbotes': '1',
          contribuyente: 'ROJAS PALMA FABIANA',
          cobro: '$235.00',
          recargos: '$25.00',
          boleta: '0032',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE',
        },
        {
          date: '02/12/2024',
          cuenta: '56853',
          year: '2024',
          imp: 'URBANO',
          '´norbotes': '1',
          contribuyente: 'PEREZ CALVARIO LORENZO',
          cobro: '$235.00',
          recargos: '$25.00',
          boleta: '0033',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE',
        },
        {
          date: '02/12/2024',
          cuenta: '105569',
          year: '2024',
          imp: 'URBANO',
          '´norbotes': '1',
          contribuyente: 'HERNANDEZ RAMOS CATALINA',
          cobro: '$256.00',
          recargos: '$27.00',
          boleta: '0034',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE',
        },
        {
          date: '02/12/2024',
          cuenta: '105569',
          year: '2023',
          imp: 'URBANO',
          '´norbotes': '1',
          contribuyente: 'HERNANDEZ RAMOS CATALINA',
          cobro: '$239.00',
          recargos: '$25.00',
          boleta: '0034',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE',
        },
        {
          date: '02/12/2024',
          cuenta: '105569',
          year: '2022',
          imp: 'URBANO',
          '´norbotes': '1',
          contribuyente: 'HERNANDEZ RAMOS CATALINA',
          cobro: '$224.00',
          recargos: '$24.00',
          boleta: '0034',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE',
        },
        {
          date: '02/12/2024',
          cuenta: '113256',
          year: '2023',
          imp: 'URBANO',
          '´norbotes': '1',
          contribuyente: 'SANCHEZ SOLA MARIA CELINA Y CD.',
          cobro: '$426.00',
          recargos: '$45.00',
          boleta: '0035',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE',
        },
        {
          date: '02/12/2024',
          cuenta: '113256',
          year: '2024',
          imp: 'URBANO',
          '´norbotes': '1',
          contribuyente: 'SANCHEZ SOLA MARIA CELINA Y CD.',
          cobro: '$456.00',
          recargos: '$48.00',
          boleta: '0035',
          cfdi: '9CD00687-FF7F4E93-9396-D2CC08048ABE',
        },
        {
          date: '03/12/2024',
          cuenta: '68518',
          year: '2024',
          imp: 'URBANO',
          '´norbotes': '1',
          contribuyente: 'TEPOX PALMA NICANOR',
          cobro: '$493.00',
          recargos: '$52.00',
          boleta: '0036',
          cfdi: '11832B0D-05FE-4061-A53F-E1363B74381F',
        },
        {
          date: '05/12/2024',
          cuenta: '108025',
          year: '2024',
          imp: 'URBANO',
          '´norbotes': '1',
          contribuyente: 'CASTILLO MORALES CARLOS Y CD.',
          cobro: '$235.00',
          recargos: '$25.00',
          boleta: '0037',
          cfdi: 'CFD25271-3D4C-4726-B643-98DEE591E49B',
        },
        {
          date: '05/12/2024',
          cuenta: '44044',
          year: '2021',
          imp: 'RUSTICO',
          '´norbotes': '1',
          contribuyente: 'RAMIREZ HERNANDEZ SIMON Y D',
          cobro: '$175.00',
          recargos: '$-',
          boleta: '0038',
          cfdi: 'CFD25271-3D4C-4726-B643-98DEE591E49B',
        },
        {
          date: '05/12/2024',
          cuenta: '44044',
          year: '2022',
          imp: 'RUSTICO',
          '´norbotes': '1',
          contribuyente: 'RAMIREZ HERNANDEZ SIMON Y D',
          cobro: '$207.00',
          recargos: '$22.00',
          boleta: '0038',
          cfdi: 'CFD25271-3D4C-4726-B643-98DEE591E49B',
        },
        {
          date: '05/12/2024',
          cuenta: '44044',
          year: '2023',
          imp: 'RUSTICO',
          '´norbotes': '1',
          contribuyente: 'RAMIREZ HERNANDEZ SIMON Y D',
          cobro: '$224.00',
          recargos: '$24.00',
          boleta: '0038',
          cfdi: 'CFD25271-3D4C-4726-B643-98DEE591E49B',
        },
        {
          date: '05/12/2024',
          cuenta: '44044',
          year: '2024',
          imp: 'RUSTICO',
          '´norbotes': '1',
          contribuyente: 'RAMIREZ HERNANDEZ SIMON Y D',
          cobro: '$235.00',
          recargos: '$25.00',
          boleta: '0038',
          cfdi: 'CFD25271-3D4C-4726-B643-98DEE591E49B',
        },
        {
          date: '05/12/2024',
          cuenta: '49130',
          year: '2024',
          imp: 'RUSTICO',
          '´norbotes': '1',
          contribuyente: 'APANCO ROJAS TOMASA',
          cobro: '$235.00',
          recargos: '$25.00',
          boleta: '0039',
          cfdi: 'CFD25271-3D4C-4726-B643-98DEE591E49B',
        },
        {
          date: '06/12/2024',
          cuenta: '101576',
          year: '2024',
          imp: 'URBANO',
          '´norbotes': '1',
          contribuyente: 'BARRANCO MARTINEZ PETRA',
          cobro: '$235.00',
          recargos: '$25.00',
          boleta: '0040',
          cfdi: 'D069E759-49D2-47F9-9952-9D0981BE7CFC',
        },
        {
          date: '06/12/2024',
          cuenta: '65382',
          year: '2024',
          imp: 'URBANO',
          '´norbotes': '1',
          contribuyente: 'GRANDE MONTIEL MAURO',
          cobro: '$235.00',
          recargos: '$25.00',
          boleta: '0041',
          cfdi: 'D069E759-49D2-47F9-9952-9D0981BE7CFC',
        }

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
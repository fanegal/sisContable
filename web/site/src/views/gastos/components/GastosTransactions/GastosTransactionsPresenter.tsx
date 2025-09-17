import type { TabsRef } from "node_modules/common-lib/dist/components/molecules/tabs/Tabs";
import { useMemo, useRef } from "react"; 
import { ListaDeudores } from "../Deudores/ListaDeudores";


export function useGastosTransactionsPresenter() {
    const tabsRef = useRef<TabsRef>(null);
    const tabs = useMemo(() => [{
        id: "a",
        label: "Deudores",
        component: <ListaDeudores/>,
    },
    {
        id: "b",
        label: "Cancelados",
        component: <>Maqueta Contrato</>,
    },
    {
        id: "c",
        label: "Gasto",
        component: <>Maqueta Contrato</>,
    }

    ], []);

    return {
        GastosData: {
            tabsRef,
            tabs,
        },
    }
}
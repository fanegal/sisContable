import type { TabsRef } from "node_modules/common-lib/dist/components/molecules/tabs/Tabs";
import { useMemo, useRef } from "react";
import { ListaRC } from "../RC/ListaRC" 

export function useIngresosTransactionsPresenter() {
    const tabsRef = useRef<TabsRef>(null);
    const tabs = useMemo(() => [{
        id: "a",
        label: "Pedrial",
        component: <>Maqueta Contrato</>,
    },
    {
        id: "b",
        label: "Registro Civil",
        component: <ListaRC/>,
    },
    {
        id: "c",
        label: "Constancias",
        component: <>Maqueta Contrato</>,
    }

    ], []);

    return {
        ingresosData: {
            tabsRef,
            tabs,
        },
    }
}
import type { TabsRef } from "node_modules/common-lib/dist/components/molecules/tabs/Tabs";
import { useMemo, useRef } from "react";
import { ListaRC } from "../RC/ListaRC"
import { ListaPD } from "../PD/ListaPD"
import { ListaCT } from "../CT/ListaCT"

export function useIngresosTransactionsPresenter() {
    const tabsRef = useRef<TabsRef>(null);
    const tabs = useMemo(() => [{
        id: "a",
        label: "Pedrial",
        component: <ListaPD />,
    },
    {
        id: "b",
        label: "Registro Civil",
        component: <ListaRC />,
    },
    {
        id: "c",
        label: "Constancias",
        component: <ListaCT />,
    }

    ], []);

    return {
        ingresosData: {
            tabsRef,
            tabs,
        },
    }
}
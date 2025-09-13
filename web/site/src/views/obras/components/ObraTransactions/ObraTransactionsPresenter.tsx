import type { TabsRef } from "node_modules/common-lib/dist/components/molecules/tabs/Tabs";
import { useMemo, useRef } from "react";

export function useObrasTransactionsPresenter() {
    const tabsRef = useRef<TabsRef>(null);
    const tabs = useMemo(() => [{
            id: "b",
            label: "Contrato",
            component: <>Maqueta Contrato</>,
        }, 
        /* {
            id: "c",
            label: "Contrato Fianza",
            component: renterCommon(),
        },  */
        {
            id: "i",
            label: "Estimación",
            component: <>Maqueta Estimación</>,
        }, 
        {
            id: "j",
            label: "Anticipo",
            component: <>Maqueta Anticipo</>,
        }, 
        {
            id: "d",
            label: "Conceptos",
            component: <>Maqueta Conceptos</>,
        }, 
        /* {
            id: "e",
            label: "Concepto Estimación",
            component: renterCommon(),
        },  */
        /* {
            id: "f",
            label: "Concepto Anticipo",
            component: renterCommon(),
        },  */
        {
            id: "g",
            label: "Contratista",
            component: <>Maqueta Contratista</>,
        }, {
            id: "h",
            label: "Avance Físico",
            component: <>Maqueta Avance Físico</>,
        },

    ], []);

    return {
        obrasData: {
            tabsRef,
            tabs,
        },
    }
}
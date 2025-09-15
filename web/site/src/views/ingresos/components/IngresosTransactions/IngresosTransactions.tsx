import { Content, Tabs } from "common-lib";
import { useIngresosTransactionsPresenter } from "./IngresosTransactionsPresenter";
import "../../ingresos.scss";

export function IngresosTransactions({ }) {
    const { ingresosData } = useIngresosTransactionsPresenter();

    return <Content>
        <Tabs ref={ingresosData.tabsRef} tabs={ingresosData.tabs} onTabChange={() => { }} extraClass="tabs-obras" indicatorWidth={40} />
    </Content>
}
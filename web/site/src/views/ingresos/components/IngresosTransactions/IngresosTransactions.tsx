import { Content, Icon, Tabs } from "common-lib";
import { useIngresosTransactionsPresenter } from "./IngresosTransactionsPresenter";
import "../../ingresos.scss";

export function IngresosTransactions({ setRenderOperations }) {
    const { ingresosData } = useIngresosTransactionsPresenter();

    return <Content>
        <div onClick={() => { setRenderOperations(false) }} className="return-btn">
            <Icon name="chevron_backward" type="symbols" />
            <span>Regresar</span>
        </div>
        <Tabs ref={ingresosData.tabsRef} tabs={ingresosData.tabs} onTabChange={() => { }} extraClass="tabs-obras" indicatorWidth={40} />
    </Content>
}
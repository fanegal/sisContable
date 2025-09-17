import { Content, Tabs, Icon } from "common-lib";
import { useGastosTransactionsPresenter } from "./GastosTransactionsPresenter";
import "../../Gastos.scss";

export function GastosTransactions({ setRenderOperations }) {
    const { GastosData } = useGastosTransactionsPresenter();

    return <Content>
        <div onClick={() => { setRenderOperations(false) }} className="return-btn">
            <Icon name="chevron_backward" type="symbols" />
            <span>Regresar</span>
        </div>
        <Tabs ref={GastosData.tabsRef} tabs={GastosData.tabs} onTabChange={() => { }} extraClass="tabs-obras" indicatorWidth={40} />
    </Content>
}
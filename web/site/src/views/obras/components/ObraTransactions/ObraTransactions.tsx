import { Content, Icon, Tabs } from "common-lib";
import { useObrasTransactionsPresenter } from "./ObraTransactionsPresenter";
import "../../obras.scss";
import { Fragment } from "react/jsx-runtime";

export function ObraTransactions({ setRenderOperations }) {
    const { obrasData } = useObrasTransactionsPresenter();

    return <Content>
        <div onClick={() => { setRenderOperations(false) }} className="return-btn">
            <Icon name="chevron_backward" type="symbols" />
            <span>Regresar</span>
        </div>
        <Tabs ref={obrasData.tabsRef} tabs={obrasData.tabs} onTabChange={() => { }} extraClass="tabs-obras" indicatorWidth={40} />
    </Content>
}
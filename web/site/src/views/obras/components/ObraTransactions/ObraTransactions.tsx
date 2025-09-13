import { Content, Tabs } from "common-lib";
import { useObrasTransactionsPresenter } from "./ObraTransactionsPresenter";
import "../../obras.scss";

export function ObraTransactions({ }) {
    const { obrasData } = useObrasTransactionsPresenter();

    return <Content>
        <Tabs ref={obrasData.tabsRef} tabs={obrasData.tabs} onTabChange={() => { }} extraClass="tabs-obras" indicatorWidth={40} />
    </Content>
}
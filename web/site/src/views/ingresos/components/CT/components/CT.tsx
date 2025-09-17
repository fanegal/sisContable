import { Button, Content, Form, Icon, Tabs } from "common-lib";
import { useCTPresenter } from "./CTPresenter";
import "../../../ingresos.scss";

export function CT({ setRenderOperations }) {
    const { form, formRef } = useCTPresenter();

    return <section className="Obra">
        <div className="cover-form" key={`section-obra`}>
            <Form
                data={form}
                form={formRef}
                hasAction={false}
                buttonAction={() => {

                }}
                buttonDisable={false}
                buttonText={""}
                extraClass={"obra-form"}
                onChangeForm={(e, index) => { }}
                onBlurForm={(e, index) => { }}
                onFocusForm={(e, index) => { }}
            />

            <div className="actions-form">
                <Button onClick={() => {
                    setRenderOperations(false)
                }}>Regresar</Button>

            </div>
        </div>

    </section>
}
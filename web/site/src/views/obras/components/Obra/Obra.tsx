import { Button, Content, Form, Icon, Tabs } from "common-lib";
import { useObraPresenter } from "./ObraPresenter";
import "../../obras.scss";

export function Obra({ }) {
    const { form, formRef, onAccept } = useObraPresenter();

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
                    onAccept()
                }}>Guardar</Button>

            </div>
        </div>

    </section>
}
import { Content, Form, Icon, Tabs } from "common-lib";
import { useEstimacionPresenter } from "./EstimacionPresenter";
import "../../obras.scss";

export function Estimacion({ }) {
    const { form, formRef, addEstimacion, removeEstimacion } = useEstimacionPresenter();

    return <section className="estimacion">
        {form.map((formInd, idx) => (
            <div className="cover-form" key={`section-${idx}`}>
                <Form
                    data={formInd}
                    form={formRef}
                    hasAction={false}
                    buttonAction={() => {

                    }}
                    buttonDisable={false}
                    buttonText={""}
                    extraClass={"recovery-form3"}
                    onChangeForm={(e, index) => { }}
                    onBlurForm={(e, index) => { }}
                    onFocusForm={(e, index) => { }}
                />
            </div>


        ))}

        <div className="add-section" onClick={addEstimacion}>
            <p>Agregar nueva estimación</p>
            <Icon name="add_circle" />
        </div>
    </section>
}
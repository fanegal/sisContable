import { Form, Icon } from "common-lib";
import "../../obras.scss";
import { useConceptosPresenter } from "./ConceptosPresenter";

export function Conceptos({ }) {
    const { form, formRef, addEstimacion, removeEstimacion } = useConceptosPresenter();

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
            <p>Agregar nuevo concepto</p>
            <Icon name="add_circle" />
        </div>
    </section>
}
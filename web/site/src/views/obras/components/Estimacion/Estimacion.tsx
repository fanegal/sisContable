import { Form, Icon } from "common-lib";
import "../../obras.scss";
import { useEstimacionPresenter } from "./EstimacionPresenter";

export function Estimacion({ isEdit = false }:any) {
    const {
        form,
        formRef,
        addEstimacion,
        removeEstimacion,
        jsonArrayEstimaciones,
        setJsonArrayEstimaciones
    } = useEstimacionPresenter(isEdit);

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
                    extraClass={"obra-form"}
                    onChangeForm={(e, index) => {
                        console.log(e);
                        console.log("lastJson ", jsonArrayEstimaciones);

                        setJsonArrayEstimaciones(prev => {
                            const next: any = [...prev];
                            next[idx] = { ...(next[idx] ?? {}), [e.id]: e.value };
                            localStorage.setItem("estimaciones", JSON.stringify(next))
                            return next;
                        });
                    }}
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
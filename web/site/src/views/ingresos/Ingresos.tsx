import "./ingresos.scss";
import { useIngresosPresenter } from "./IngresosPresenter";
export default function Ingresos({ }) {

    const { onSubmit } = useIngresosPresenter();

    return <section>
        Ingresos
        <button onClick={onSubmit}>click me</button>
    </section>
}
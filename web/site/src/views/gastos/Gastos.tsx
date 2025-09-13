import "./gastos.scss";
import { useGastosPresenter } from "./GastosPresenter";
export default function Gastos({ }) {

    const { onSubmit } = useGastosPresenter();

    return <section>
        Gastos
        <button onClick={onSubmit}>click me</button>
    </section>
}
import { Content, Tabs } from "common-lib";
import "../../../ingresos.scss";
import { useRef, useState } from "react";

export const FORM_REGISTRO_CIVIL = [
    {
        type: "text",
        value: "",
        label: "Ubicación",
        placeholder: "Calle Metepec #509",
        id: "location",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "location-input",
    },
    {
        type: "select",
        value: "",
        label: "Tipo de obra",
        placeholder: "Selecciona un tipo de obra",
        id: "tipoObra",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "tipo-input",
        values: [
            { label: "Nueva", value: "Nueva" },
            { label: "Ampliación", value: "Ampliación" },
            { label: "Proceso", value: "Proceso" },
            { label: "Rehabilitación", value: "Rehabilitación" },
        ],
    },
    {
        type: "text",
        value: "",
        label: "Oficio de asignación",
        placeholder: "MTP/TES-2019004",
        id: "location",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "location-input",
    },
    {
        type: "select",
        value: "",
        label: "Modalidad de ejecución",
        placeholder: "Modalidad de ejecución",
        id: "modalidad",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "modalidad-input",
        values: [
            { label: "Administración directa", value: "Administración directa" },
            { label: "Contrato", value: "Contrato" },
            { label: "Convenio", value: "Convenio" },
        ],
    },
    {
        type: "price",
        value: "",
        label: "Costo con descuento",
        placeholder: "$ Precio con cupón aplicado",
        id: "field4",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "date-special",
        value: "",
        label: "Fecha de finalización",
        placeholder: "00 / 00 / 0000",
        id: "field6",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
];

export function useRCPresenter() {

    const [form, setForm] = useState(FORM_REGISTRO_CIVIL);
    const formRef = useRef(new Date().getTime());

    return {
        form,
        setForm,
        formRef,
    }
}
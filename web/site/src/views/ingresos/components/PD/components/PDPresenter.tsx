import { Content, Tabs } from "common-lib";
import "../../../ingresos.scss";
import { useRef, useState } from "react";

export const FORM_PREDIAL = [
    {
        type: "date-special",
        value: "",
        label: "Fecha",
        placeholder: "00 / 00 / 0000",
        id: "date",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "text",
        value: "",
        label: "Cuenta",
        placeholder: "Ej. 50726",
        id: "cuenta",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "text",
        value: "",
        label: "Año",
        placeholder: "Ej. 2024",
        id: "year",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
        {
        type: "select",
        value: "",
        label: "Tipo",
        placeholder: "Seleccione un tipo",
        id: "tipo",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.tipo",
        globalExtraClass: "register-input",
        values: [
            { label: "RUSTICO", value: "RUSTICO" },
            { label: "URBANO", value: "URBANO" }

        ]
    },
    {
        type: "price",
        value: "",
        label: "Impuesto",
        placeholder: "$0.00",
        id: "imp",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "text",
        value: "",
        label: "NO.RBO.TES.",
        placeholder: "Ej. 1",
        id: "norbotes",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "text",
        value: "",
        label: "Contribuyente",
        placeholder: "Nombre completo",
        id: "contribuyente",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "price",
        value: "",
        label: "Cobro",
        placeholder: "$0.00",
        id: "cobro",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "price",
        value: "",
        label: "Recargos",
        placeholder: "$0.00",
        id: "recargos",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "text",
        value: "",
        label: "No. Boleta",
        placeholder: "Ej. 0032",
        id: "boleta",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    },
    {
        type: "text",
        value: "",
        label: "CFDI",
        placeholder: "UUID",
        id: "cfdi",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.name",
        globalExtraClass: "register-input",
    }
];

export function usePDPresenter() {

    const [form, setForm] = useState(FORM_PREDIAL);
    const formRef = useRef(new Date().getTime());

    return {
        form,
        setForm,
        formRef,
    }
}
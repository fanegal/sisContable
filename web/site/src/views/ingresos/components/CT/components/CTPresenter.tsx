import { Content, Tabs } from "common-lib";
import "../../../ingresos.scss";
import { useRef, useState } from "react";

export const FORM_CONSTANCIA = [
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
        label: "Recibo",
        placeholder: "Ej. 000123",
        id: "recibo",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.recibo",
        globalExtraClass: "register-input",
    },
     {
        type: "text",
        value: "",
        label: "Concepto",
        placeholder: "Concepto",
        id: "concepto",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.nombre",
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
        label: "Precio",
        placeholder: "$0.00",
        id: "precio",
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

export function useCTPresenter() {

    const [form, setForm] = useState(FORM_CONSTANCIA);
    const formRef = useRef(new Date().getTime());

    return {
        form,
        setForm,
        formRef,
    }
}
import { Content, Tabs } from "common-lib";
import "../../../ingresos.scss";
import { useRef, useState } from "react";

export const FORM_REGISTRO_CIVIL = [
    {
        type: "date-special",
        value: "",
        label: "Fecha",
        placeholder: "00 / 00 / 0000",
        id: "date",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.date",
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
            { label: "EXT.NAC.", value: "EXT.NAC." },
            { label: "FOR.NAC.", value: "FOR.NAC." },
            { label: "EXT.MAT.", value: "EXT.MAT." },
            { label: "EXT.DEF.", value: "EXT.DEF." },
            { label: "FOR.DIV.", value: "FOR.DIV." },
            { label: "FOR.MAT.", value: "FOR.MAT." },
            { label: "PRE.MAT.", value: "PRE.MAT." },

        ]
    },
    {
        type: "text",
        value: "",
        label: "Folio",
        placeholder: "Ej. 456789",
        id: "folio",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.folio",
        globalExtraClass: "register-input",
    },
    {
        type: "text",
        value: "",
        label: "Nombre",
        placeholder: "Nombre completo",
        id: "nombre",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.nombre",
        globalExtraClass: "register-input",
    },
    {
        type: "price",
        value: "",
        label: "Producto",
        placeholder: "$0.00",
        id: "producto",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.cr",
        globalExtraClass: "register-input",
    },
    {
        type: "price",
        value: "",
        label: "Cobro Real",
        placeholder: "$0.00",
        id: "cr",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.cr",
        globalExtraClass: "register-input",
    },
    {
        type: "price",
        value: "",
        label: "Derecho",
        placeholder: "$0.00",
        id: "derechoorig",
        required: true,
        hasTopLabel: true,
        hasError: false,
        error: "invite.errors.derechoorig",
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
        error: "invite.errors.cfdi",
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
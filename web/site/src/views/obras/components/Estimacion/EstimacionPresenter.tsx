import { Content, Tabs } from "common-lib";
import "../../obras.scss";
import { useRef, useState } from "react";

export const FORM_ESTIMACION = [
    [
        {
            type: "select",
            value: "",
            label: "",
            placeholder: "Selecciona una opción de sección",
            id: "field10",
            required: true,
            hasTopLabel: true,
            hasError: false,
            error: "invite.errors.name",
            globalExtraClass: "register-input",
            values: [
                { label: "Términos y condiciones", value: "Términos y condiciones" },
                {
                    label: "Cobertura o tiendas participantes",
                    value: "Cobertura o tiendas participantes",
                },
                { label: "Restricciones", value: "Restricciones" },
                { label: "Procedimientos de canje", value: "Procedimientos de canje" },
                { label: "Reglas", value: "Reglas" },
                {
                    label: "Métodos de pago aplicables",
                    value: "Métodos de pago aplicables",
                },
            ],
        },
        {
            type: "richtext",
            value: "",
            label: "Describe lo que quieras contar respecto a tu cupón",
            placeholder: "Describe lo que quieras contar respecto a tu cupón",
            id: "field11",
            required: true,
            hasTopLabel: true,
            hasError: false,
            error: "invite.errors.name",
            globalExtraClass: "register-input",
        },
    ],
];

const makeSection = (template: any[], sectionIndex: number) =>
    template.map((field, i) => ({
        ...field,
        id: `${field.id}__${sectionIndex}_${i}`,
        value: "",
    }));

export function useEstimacionPresenter() {

    const [form, setForm] = useState(FORM_ESTIMACION);
    const formRef = useRef(new Date().getTime());

    const addEstimacion = () => {
        setForm((prev) => [...prev, makeSection(FORM_ESTIMACION[0], prev.length)]);
    };

    const removeEstimacion = (index: number) => {
        setForm((prev) => prev.filter((_, i) => i !== index));
    };

    return {
        form,
        setForm,
        formRef,
        addEstimacion,
        removeEstimacion
    }
}
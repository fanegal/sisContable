import { Content, Tabs } from "common-lib";
import "../../obras.scss";
import { useRef, useState } from "react";

export const FORM_CONCEPTO = [
    [
        {
            type: "textarea",
            value: "",
            label: "",
            placeholder: "Concepto",
            id: "concepto",
            required: true,
            hasTopLabel: true,
            hasError: false,
            error: "invite.errors.name",
            globalExtraClass: "concepto-input"
        },
        {
            type: "text",
            value: "",
            label: "Ponderado",
            placeholder: "%123",
            id: "ponderado",
            required: true,
            hasTopLabel: true,
            hasError: false,
            error: "invite.errors.name",
            globalExtraClass: "ponderado-input",
        },
        {
            type: "text",
            value: "",
            label: "Total presupuestado",
            placeholder: "1000.00",
            id: "presupuestado",
            required: true,
            hasTopLabel: true,
            hasError: false,
            error: "invite.errors.name",
            globalExtraClass: "presupuestado-input",
        },
      //Agregar Estimaciones
      //agregar anticipo
    ],
];

const makeSection = (template: any[], sectionIndex: number) =>
    template.map((field, i) => ({
        ...field,
        id: `${field.id}`,
        value: "",
    }));

export function useConceptosPresenter() {

    const [form, setForm] = useState(FORM_CONCEPTO);
    const formRef = useRef(new Date().getTime());

    const addEstimacion = () => {
        setForm((prev) => [...prev, makeSection(FORM_CONCEPTO[0], prev.length)]);
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
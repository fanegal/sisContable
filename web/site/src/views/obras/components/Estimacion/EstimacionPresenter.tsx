import { Content, Tabs } from "common-lib";
import "../../obras.scss";
import { useEffect, useRef, useState } from "react";

export const FORM_ESTIMACION = [
    [
        {
            type: "text",
            value: "",
            label: "NUM. CHEQUE /TRANSF.",
            placeholder: "%123",
            id: "ponderado",
            required: true,
            hasTopLabel: true,
            hasError: false,
            error: "invite.errors.name",
            globalExtraClass: "ponderado-input",
        }, {
            type: "text",
            value: "",
            label: "FECHA DEL CHEQUE/TRNSF.",
            placeholder: "%123",
            id: "fechaCheque",
            required: true,
            hasTopLabel: true,
            hasError: false,
            error: "invite.errors.name",
            globalExtraClass: "ponderado-input",
        }, {
            type: "text",
            value: "",
            label: "NO.FACTURA",
            placeholder: "%123",
            id: "factura",
            required: true,
            hasTopLabel: true,
            hasError: false,
            error: "invite.errors.name",
            globalExtraClass: "ponderado-input",
        }, {
            type: "text",
            value: "",
            label: "FOL.FISCAL",
            placeholder: "%123",
            id: "folioFiscal",
            required: true,
            hasTopLabel: true,
            hasError: false,
            error: "invite.errors.name",
            globalExtraClass: "ponderado-input",
        }, {
            type: "quantity",
            value: "",
            label: "IMPORTE",
            placeholder: "%123",
            id: "importe",
            required: true,
            hasTopLabel: true,
            hasError: false,
            error: "invite.errors.name",
            globalExtraClass: "ponderado-input",
        }, {
            type: "date-special",
            value: "",
            label: "FECHA FACT.",
            placeholder: "%123",
            id: "fechaFactura",
            required: true,
            hasTopLabel: true,
            hasError: false,
            error: "invite.errors.name",
            globalExtraClass: "ponderado-input",
        },
    ],
];

const makeSection = (template: any[], sectionIndex: number) =>
    template.map((field, i) => ({
        ...field,
        id: `${field.id}`,
        value: "",
    }));

export function useEstimacionPresenter(isEdit) {

    const [form, setForm] = useState(FORM_ESTIMACION);
    const formRef = useRef(new Date().getTime());

    const [jsonArrayEstimaciones, setJsonArrayEstimaciones] = useState([]);

    const addEstimacion = () => {
        setForm((prev) => [...prev, makeSection(FORM_ESTIMACION[0], prev.length)]);
    };

    const removeEstimacion = (index: number) => {
        setForm((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (isEdit) {
            let arrayEmpty: any = [];
            let copyForm: any = [...form];
            copyForm.forEach(element => {
                element.forEach((item: any) => {
                    let obj: any = {

                    }
                    Object.keys(item).map((itemVal: any) => {
                        obj[itemVal.id] = itemVal.value;
                    })
                    arrayEmpty.push(obj);
                });
            });

            setJsonArrayEstimaciones(arrayEmpty);
        }
    }, [isEdit]);

    return {
        form,
        setForm,
        formRef,
        addEstimacion,
        removeEstimacion,
        jsonArrayEstimaciones,
        setJsonArrayEstimaciones
    }
}
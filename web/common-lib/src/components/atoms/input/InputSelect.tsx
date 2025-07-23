import React, { useState } from "react";
import { InputInterface } from "../../../types/Input.types";
import { useTranslation } from "react-i18next";
import { useTheme } from "./../../../context/ThemeContext";

export default function InputSelect({
    inputData,
    index,
    onChange,
    onBlur,
}: {
    inputData: InputInterface;
    index: number;
    onChange: Function;
    onBlur: Function;
}) {
    const theme: any = useTheme();
    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = useState(inputData.value || "");

    const handleChange = (event) => {
        const value = event.target.value;
        inputData.value = value;
        inputData.hasError = false;
        setSelectedValue(value);
        onChange(inputData, index);
    };

    const handleBlur = (event) => {
        if (!inputData.noUpdate) {
            inputData.value = event.target.value;
            inputData.hasError = false;
            onBlur(inputData, index);
        } else {
            onBlur(inputData, index);
        }
    };

    return (
        <section
            className={`${inputData.globalExtraClass || ""} ${inputData.extraClass || ""} gp-form`}
        >
            <div className={`master-input`} style={{ width: "100%" }}>
                {inputData.hasTopLabel && (
                    <p className="top-label" style={{ color: theme.theme.textColor }}>
                        {t(inputData.label!)}
                    </p>
                )}
                {inputData.extraLeftComponent}
                <select
                    id={inputData.id}
                    className={`arsa-input arsa-select ${inputData.hasError ? "round-error" : ""}`}
                    value={selectedValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={{ borderColor: theme.theme.textColor }}
                >
                    {inputData.defaultOption && (
                        <option value="">{t(inputData.defaultOptionLabel || "Selecciona una opción")}</option>
                    )}

                    {inputData.values?.map((option: any, idx: number) => (
                        <option key={idx} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                {inputData.extraComponent}
            </div>

            {inputData.required && inputData.hasError && (
                <p className="error">{inputData.errorMessage}</p>
            )}
        </section>
    );
}


import { InputInterface } from "../../../types/Input.types";
import React from "react";
import { useTranslation } from "react-i18next";

interface InputTextareaProps {
  inputData: InputInterface;
  index: number;
  onChange: Function;
  onBlur: Function;
}

export default function InputTextarea({
  inputData,
  index,
  onChange,
  onBlur,
}: InputTextareaProps) {
  const { t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    inputData.value = event.target.value;
    inputData.hasError = false;
    onChange(inputData, index);
  };

  const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
    inputData.value = event.target.value;
    inputData.hasError = false;
    onBlur(inputData, index);
  };

  return (
    <div className={`master-area ${inputData.extraComponent ? "inp-icon" : ""}`}>
      <textarea
        id={inputData.id ?? ""}
        value={inputData.value ?? ""}
        cols={inputData.cols ?? 30}
        rows={inputData.rows ?? 3}
        className="arsa-input"
        placeholder={t(inputData.placeholder)}
        maxLength={inputData.maxLength ?? 100}
        onChange={handleChange}
        onBlur={handleBlur}
        style={{
          width: inputData.extraComponent ? "calc(100% - 40px)" : "100%",
          height: "auto",
        }}
      />
      {inputData.extraComponent}
    </div>
  );
}

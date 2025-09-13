import { useTheme } from "../../../context/ThemeContext";;
import { InputInterface } from "../../../types/Input.types";
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function InputPhoto({
  inputData,
  index,
  onChange,
  onBlur,
}: {
  inputData: InputInterface & { valueAlt?: string };
  index: number;
  onChange: Function;
  onBlur: Function;
}) {
  const theme: any = useTheme();
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("read error"));
      reader.readAsDataURL(file);
    });

  const validateAndSetFile = async (file?: File) => {
    if (!file) return;

    const allowed = inputData.allowedFormats || [];
    const maxSizeMB = inputData.maxSizeMB || 1.5;
    const ext = file.name.split(".").pop()?.toLowerCase();
    const isValidExt = allowed.includes(ext || "");
    const isValidSize = file.size <= maxSizeMB * 1024 * 1024;

    if (!isValidExt) {
      inputData.hasError = true;
      inputData.errorMessage = t("Archivo no compatible");
      onChange(inputData, index);
      return;
    }

    if (!isValidSize) {
      inputData.hasError = true;
      inputData.errorMessage = t(`Archivo excede el límite de ${maxSizeMB}MB`);
      onChange(inputData, index);
      return;
    }

    const base64 = await fileToBase64(file);

    inputData.value = file;
    inputData.valueAlt = base64;
    inputData.hasError = false;
    inputData.errorMessage = "";
    onChange(inputData, index);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    void validateAndSetFile(file);
  };

  const renderType = () => {
    if ((inputData.forceType || inputData.type) !== "photo") return null;

    return (
      <div className="photo-input-wrapper">
        {inputData.hasTopLabel && (
          <p className="top-label" style={{ color: theme.theme.primary }}>
            {t(inputData.label!)}
          </p>
        )}

        <div
          className={`photo-dropzone ${inputData.hasError ? "error" : ""}`}
          onClick={() => inputRef.current?.click()}
        >
          <div
            className="photo-circle"
            style={{
              borderColor: theme.theme.primary,
              backgroundImage: inputData.valueAlt ? `url(${inputData.valueAlt})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {!inputData.valueAlt && (
              <span className="material-icons" style={{ fontSize: 32, color: theme.theme.primary }}>
                image
              </span>
            )}
          </div>

          {!!inputData.valueAlt && (
            <div className="dropzone-preview">
              <img src={inputData.valueAlt} alt={t("Imagen seleccionada") as string} />
            </div>
          )}
        </div>

        <input
          ref={inputRef}
          id={inputData.id}
          type="file"
          accept={inputData.allowedFormats?.map(ext => "." + ext).join(",")}
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
      </div>
    );
  };

  return (
    <section className={`${inputData.globalExtraClass} ${inputData.extraClass} gp-form`}>
      {renderType()}
      {inputData.required && inputData.hasError && (
        <p className="error">{inputData.errorMessage}</p>
      )}
    </section>
  );
}

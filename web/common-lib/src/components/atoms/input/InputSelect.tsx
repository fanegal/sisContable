import { ChangeEvent, useState } from "react";
import { InputInterface } from "../../../types/Input.types";
import Icon from "../icon/Icon";
import { useTheme } from "../../../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function InputSelect({
  inputData,
  index,
  onChange = () => { },
  onBlur = () => { },
  onFocus = () => { },
}: {
  inputData: InputInterface;
  index: number;
  onChange?: Function;
  onBlur?: Function;
  onFocus?: Function;
}) {
  const [open, setOpen] = useState(false);
  const theme: any = useTheme();
  const { t } = useTranslation();
  const handleSelectChange = (e: any) => {
    console.log("Cambio de selección:");
    console.log("Cambio de selección:", e);
    const event = {
      target: {
        value: e.value,
        label: inputData.label,
      },
    };
    inputData.value = e.value;
    onChange(event, index);
    setOpen(false);
  };

  return (
    <div className={`gp-input ${inputData.extraClass || ""}`}>
      {inputData.hasTopLabel && (
        <p className="top-label" style={{
          color: theme.theme.primary
        }}>{t(inputData.label!)}</p>
      )}

      <div className="custom-select ">
        <div className="select-box" onClick={() => setOpen(!open)}>
          {inputData.value ? (
            inputData.values?.find(option => option.value === inputData.value)?.label ?? inputData.value
          ) : (
            <span className="placeholder">{inputData.placeholder}</span>
          )}
          <div className="select-arrow">
            <Icon name={open ? "expand_less" : "expand_more"} />
          </div>
        </div>

        {open && (
          <ul className="select-dropdown">
            {inputData.values!.map((option) => (
              <li
                key={option.value}
                className="select-option"
                onClick={() => handleSelectChange(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      {inputData.hasError && inputData.errorMessage && (
        <div className="error">{inputData.errorMessage}</div>
      )}
    </div>
  );
}

import React from "react";
import { InputInterface } from "../../../types/Input.types";
import InputText from "./InputText";
import InputPassword from "./InputPassword";
import InputTextarea from "./InputTextarea";
import "./input.scss";
import InputPhone from "./InputPhone";
import InputDate from "./InputDate";
import InputOTP from "./InputOTP";
import InputCheckbox from "./InputCheckbox";
import InputDragDrop from "./InputDragDrop";
import InputPhoto from "./InputPhoto";
import InputRichText from "./InputRichText";
import InputQuantity from "./InputQuantity";
import InputSelect from "./InputSelect";
import InputMap from "./InputMap";
import DateSpecial from "./DateSpecial";
import TimeSpecial from "./TimeSpecial";

export default function Input({
  extraClass = "",
  globalExtraClass = "",
  onClick = () => { },
  inputData,
  index,
  onChange = (e, index?) => { },
  onBlur = (e) => { },
  onFocus = (e) => { },
}: {
  extraClass?: string;
  globalExtraClass?: string;
  onClick?: Function;
  inputData: InputInterface;
  index: number;
  onChange?: Function;
  onBlur?: Function;
  onFocus?: Function;
}) {
  let content = <></>;

  switch (inputData.forceType ?? inputData.type) {
    case "text":
    case "price":
      content = <InputText inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "password":
      content = <InputPassword inputData={inputData} index={index} onChange={onChange} onBlur={onBlur} onFocus={onFocus} />;
      break;
    case "textarea":
      content = <InputTextarea inputData={inputData} index={index} onChange={onChange} onBlur={onBlur} />;
      break;
    case "richtext":
      content = (
        <InputRichText
          inputData={inputData}
          index={index}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
      break;
    case "quantity":
      content = (
        <InputQuantity
          inputData={inputData}
          index={index}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
      break;
    case "select":
      content = (
        <InputSelect
          inputData={inputData}
          index={index}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      );
      break;
    case "phone":
      content = <InputPhone inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "otp":
      content = <InputOTP inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "checkbox":
      content = <InputCheckbox inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "date":
    case "date-timelocal":
    case "time":
      content = <InputDate inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "file":
      content = <InputDragDrop inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "photo":
      content = <InputPhoto inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "map":
      content = <InputMap inputData={inputData} index={index} onChange={(e, index?) => {
        onChange(e, index);
      }} onBlur={onBlur} />;
      break;
    case "date-special":
      content = (
        <DateSpecial
          inputData={inputData}
          index={index}
          onChange={(e, index?) => {
            console.log(e);

            onChange(e, index);
          }} onBlur={onBlur}
        />
      );
      break;

    case "time-special":
      content = (
        <TimeSpecial
          inputData={inputData}
          index={index}
          onChange={(e, index?) => {
            console.log(e);

            onChange(e, index);
          }} onBlur={() => { }}
        />
      );
      break;

    default:
      content = <InputText inputData={inputData} index={index} onChange={onChange} onBlur={onBlur} />;
      break;
  }

  return (
    <section className={`${globalExtraClass} ${extraClass} ${inputData.globalExtraClass} gp-form ${inputData.type === "between" ? "between-dates" : ""}`}
      id={inputData.id ? inputData.id + '-section' : ""}>
      {content}

    </section>
  );
}

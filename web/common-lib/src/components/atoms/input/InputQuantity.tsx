"use client";

import React, { useState } from "react";
import { InputInterface } from "../../../types/Input.types";
import Button from "../../../components/atoms/button/Button";
import Icon from "../../../components/atoms/icon/Icon";

export default function InputQuantityCounter({
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
  const value = Number(inputData.value) || 0;
  const min = inputData.min || 0;
  const max = inputData.max || 999;
  const step = inputData.step || 1;
  const disabled = inputData.disabled || false;
  const [numberOfLetters, setNumberOfLetters] = useState(0);

  const handleQuantityChange = (newValue: number) => {
    const event = {
      target: {
        value: newValue,
        name: inputData.name,
      },
    };
    console.log(inputData);
    setNumberOfLetters(newValue);
    inputData.value = newValue
    onChange(event, index);
  };

  const handleIncrement = () => {
    if (!disabled && value < max) {
      handleQuantityChange(value + step);
    }
  };

  const handleDecrement = () => {
    if (!disabled && value > min) {
      handleQuantityChange(value - step);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const newVal = Number(e.target.value);
    if (newVal >= min && newVal <= max) {
      handleQuantityChange(newVal);
    }
  };

  return (
    <div className={`gp-input ${inputData.extraClass || ""}`}>
      {inputData.hasTopLabel && inputData.label && (
        <label className="gp-input-label">
          {inputData.label}
          {inputData.required && <span className="required">*</span>}
        </label>
      )}

      <div className="quantity-counter">
        <Button
          onClick={handleDecrement}
          disabled={disabled || value <= min}
          extraClass="quantity-btn"
        >
          <Icon name="do_not_disturb_on" />
          <p>1</p>
        </Button>

        <input
          type="number"
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          disabled={disabled}
          className="quantity-input"
          readOnly={true}
          onFocus={(e) => onFocus(e, index)}
          onBlur={(e) => onBlur(e, index)}
        />

        <Button
          onClick={handleIncrement}
          disabled={disabled || value >= max}
          extraClass="quantity-btn"
        >
          <span className="material-symbols-outlined">add_circle</span>
          <p>1</p>
        </Button>
      </div>

      {inputData.hasError && inputData.errorMessage && (
        <div className="gp-input-error">{inputData.errorMessage}</div>
      )}
    </div>
  );
}

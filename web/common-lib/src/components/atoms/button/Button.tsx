import React, { MouseEventHandler } from "react";
import "./button.scss";
import {angularize} from "react-in-angularjs";
import { useTheme } from "../../../context/ThemeContext";

export default function Button({
  extraClass = "",
  onClick = () => {},
  children,
  type,
  disabled=false
}: {
  extraClass?: string;
  onClick?: any;
  children?: any;
  type?: any;
  disabled?:boolean;

}) {
  const { theme } = useTheme();

  return (
    <button
      className={`olm-btn animated fadeIn ${extraClass}`}
      onClick={onClick}
      style={{
        color: theme.componentColor,
        backgroundColor: theme.component,
      }}
      type={type ?? undefined}
    >
      {children}
    </button>
  );
}

export type ButtonProps = {
  extraClass?: string;
  type?: any;
  children?: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};
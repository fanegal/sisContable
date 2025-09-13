"use client";

import React, { useRef, useEffect, useState } from "react";
import { InputInterface } from "../../../types/Input.types";
import Icon from "../icon/Icon";

export default function InputRichText({
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
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [numberOfLetters, setNumberOfLetters] = useState(0);

  useEffect(() => {
    if (
      editorRef.current &&
      inputData.value &&
      editorRef.current.innerHTML !== inputData.value
    ) {
      editorRef.current.innerHTML = inputData.value;
    }
  }, [inputData.value]);

  const handleCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateButtonStates();
    handleContentChange();
  };

  const updateButtonStates = () => {
    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
    setIsStrikethrough(document.queryCommandState("strikeThrough"));
  };

  const handleContentChange = () => {
    updateButtonStates();

    if (editorRef.current) {
      const textContent =
        editorRef.current.textContent || editorRef.current.innerText || "";
      const cleanText = textContent.trim();

      if (cleanText.length > 1500) {
        const truncatedText = cleanText.substring(0, 1500);
        editorRef.current.textContent = truncatedText;

        // Mover el cursor al final
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);

        setNumberOfLetters(1500);
        return; // No continuar con el onChange si se excedió el límite
      }

      const content = editorRef.current.innerHTML;
      const event = {
        target: {
          value: content,
          name: inputData.name,
        },
      };
      
      inputData.value = content
      setNumberOfLetters(cleanText.length);
      onChange(event, index);
    }
  };

  const handleMouseUp = () => {
    updateButtonStates();
  };

  const handleLinkCommand = () => {
    const selection = window.getSelection();

    if (!selection || selection.rangeCount === 0) {
      alert("Por favor selecciona texto para convertir en enlace");
      return;
    }

    //verificar que el texto seleccionado sea parte del rich text editor
    if (
      editorRef.current &&
      !editorRef.current.contains(selection.anchorNode)
    ) {
      alert("Por favor selecciona texto valido");
      return;
    }

    const selectedText = selection.toString();
    if (!selectedText) {
      alert("Por favor selecciona texto para convertir en enlace");
      return;
    }

    // Verificar si la selección ya tiene un enlace
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;

    // Buscar si hay un elemento <a> en la selección
    let linkElement: HTMLAnchorElement | null = null;
    if (container.nodeType === Node.ELEMENT_NODE) {
      linkElement = (container as Element).closest("a");
    } else if (container.parentElement) {
      linkElement = container.parentElement.closest("a");
    }

    // Si ya hay un enlace, preguntamos si quiere quitarlo
    if (linkElement) {
      const shouldRemove = confirm(
        "El texto seleccionado ya tiene un enlace. ¿Quieres quitarlo?"
      );
      if (shouldRemove) {
        // Quitar el enlace usando unlink
        document.execCommand("unlink", false);
        editorRef.current?.focus();
        handleContentChange();
      }
      return;
    }

    // Si no hay enlace, crear uno nuevo
    const url = prompt("Ingresa la URL del enlace:", "https://");
    if (url && url.trim() !== "" && url !== "https://") {
      // Usar el comando createLink de document.execCommand
      document.execCommand("createLink", false, url);
      editorRef.current?.focus();
      handleContentChange();
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
      <div className={`rich-container ${inputData.hasError ? 'round-error' : ''}`}>
        <div
          ref={editorRef}
          contentEditable
          className="rich-text-editor"
          data-placeholder={inputData.placeholder}
          onInput={handleContentChange}
          onMouseUp={handleMouseUp}
          onBlur={(e) => onBlur(e)}
          onFocus={(e) => onFocus(e)}
          suppressContentEditableWarning={true}
        />

        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "16px",
            backgroundColor: "transparent",
            border: "1px transparent",
            borderBottom: "none",
            flexWrap: "wrap" as const,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${isBold ? "#007bff" : "#fac7de"}`,
              backgroundColor: isBold ? "#007bff" : "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              color: isBold ? "white" : "#eb1e7a",
              width: "24px",
              height: "24px",
              transition: "all 0.2s ease",
            }}
            onClick={() => handleCommand("bold")}
            onMouseEnter={(e) => {
              if (!isBold) {
                e.currentTarget.style.backgroundColor = "#e9ecef";
              }
            }}
            onMouseLeave={(e) => {
              if (!isBold) {
                e.currentTarget.style.backgroundColor = "white";
              }
            }}
          >
            B
          </button>
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${isItalic ? "#007bff" : "#fac7de"}`,
              backgroundColor: isItalic ? "#007bff" : "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              color: isItalic ? "white" : "#eb1e7a",
              width: "24px",
              height: "24px",
              transition: "all 0.2s ease",
              fontStyle: "italic",
            }}
            onClick={() => handleCommand("italic")}
            onMouseEnter={(e) => {
              if (!isItalic) {
                e.currentTarget.style.backgroundColor = "#e9ecef";
              }
            }}
            onMouseLeave={(e) => {
              if (!isItalic) {
                e.currentTarget.style.backgroundColor = "white";
              }
            }}
          >
            I
          </button>

          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: `1px solid ${isStrikethrough ? "#007bff" : "#fac7de"}`,
              backgroundColor: isStrikethrough ? "#007bff" : "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              color: isStrikethrough ? "white" : "#eb1e7a",
              width: "24px",
              height: "24px",
              transition: "all 0.2s ease",
            }}
            onClick={() => handleCommand("strikeThrough")}
            onMouseEnter={(e) => {
              if (!isStrikethrough) {
                e.currentTarget.style.backgroundColor = "#e9ecef";
              }
            }}
            onMouseLeave={(e) => {
              if (!isStrikethrough) {
                e.currentTarget.style.backgroundColor = "white";
              }
            }}
          >
            <del>T</del>
          </button>
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #fac7de",
              backgroundColor: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#eb1e7a",
              width: "24px",
              height: "24px",
              transition: "all 0.2s ease",
            }}
            onClick={() => handleCommand("insertOrderedList")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e9ecef";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            <Icon name={"format_list_numbered"} />
          </button>
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #fac7de",
              backgroundColor: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#eb1e7a",
              width: "24px",
              height: "24px",
              transition: "all 0.2s ease",
            }}
            onClick={() => handleCommand("insertUnorderedList")}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e9ecef";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            <Icon name="format_list_bulleted" />
          </button>
          <button
            type="button"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #fac7de",
              backgroundColor: "white",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#eb1e7a",
              width: "24px",
              height: "24px",
              transition: "all 0.2s ease",
            }}
            onClick={() => {
              try {
                handleLinkCommand();
              } catch (e) {
                console.log("error:");
                console.log(e);
              }
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#e9ecef";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "white";
            }}
          >
            <Icon name="link" />
          </button>
        </div>
      </div>
      <p className="maxim-characters">{numberOfLetters}/1500 caracteres</p>
      {inputData.hasError && inputData.errorMessage && (
        <div className="error" style={{
          marginTop: -2
        }}>{inputData.errorMessage}</div>
      )}
    </div>
  );
}

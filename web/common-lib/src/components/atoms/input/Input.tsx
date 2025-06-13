import React, { useEffect, useState } from "react";
import "./input.scss";
import iconSee from "../../../../assets/svg/icon-see.svg";
import down from "../../../../assets/svg/down.svg";
import iconHide from "../../../../assets/svg/icon-hide-v2.svg";
import { UtilService, formatCurrency } from "./../../../services/UtilService";
import { useTranslation } from "react-i18next";

export interface InputInterface {
  value: any;
  dummyValue?: any;
  values?: Array<any>;
  type: string;
  forceType?: string;
  extraComponent?: any;
  extraLeftComponent?: any;
  hasTopLabel?: boolean;
  label?: string;
  hasError?: boolean;
  placeholder: string | "";
  maxLength?: number;
  name?: string;
  hasEye?: boolean;
  cols?: number;
  rows?: number;
  extraClass?: string;
  globalExtraClass?: string;
  errorMessage?: string;
  required?: boolean;
  hasSearch?: boolean;
  noUpdate?: boolean;
  hasPlaceholder?: boolean;
  id?: any;
  forceOnblur?: boolean;
  joinSwitch?: boolean;
  rightPlaceholder?: string;
  leftPlaceholder?: string;
  rightValue?: any;
  leftValue?: any;
}

export default function Input({
  extraClass = "",
  globalExtraClass = "",
  onClick = () => {},
  inputData,
  index,
  onChange = (e, index?) => {},
  onBlur = (e) => {},
}: {
  extraClass?: string;
  globalExtraClass?: string;
  onClick?: Function;
  inputData: InputInterface;
  index: number;
  onChange?: Function;
  onBlur?: Function;
}) {
  const { t } = useTranslation();

  const [inputEnter, setMessage] = useState("");
  const [view, setView] = useState(false);
  const [idGlb, setIdGlb] = useState(`sel-${new Date().getTime()}`);
  const [addListeners, setListeners] = useState(false);

  const handleChange = (event) => {
    if (!inputData.noUpdate) {
      if (inputData.type == "price" || inputData.type == "porcentual") {
        changePrice(event);
      } else {
        inputData.value = event.target.value;
        inputData.hasError = false;
        setMessage(event.target.value);
        onChange(inputData, index);
      }
    } else {
      if (inputData.type == "price" || inputData.type == "porcentual") {
        changePrice(event);
      } else {
        onChange(inputData, index);
      }
    }
  };

  const handleBlur = (event) => {
    if (!inputData.noUpdate) {
      if (inputData.type == "price" || inputData.type == "porcentual") {
        changePrice(event, true);
      } else {
        inputData.value = event.target.value;
        inputData.hasError = false;
        setMessage(event.target.value);
        onBlur(inputData, index);
      }
    } else {
      if (inputData.type == "price" || inputData.type == "porcentual") {
        changePrice(event, true);
      } else {
        onBlur(inputData, index);
      }
    }
  };

  function changePrice(event, isHandleBlur = false) {
    let input: any = event.target.value;
    let valFinal: any = null;
    let value: any = null;
    let before: any = null;
    let after: any = null;

    let lastCharacter = event.target.value.slice(-1);

    if (!UtilService.isOnlyNumbers(lastCharacter)) {
      event.target.value = event.target.value.slice(0, -1);
      return;
    }
    let lastCharacter2 = event.target.value.slice(-1);
    if (inputData.type == "porcentual") {
      event.target.value = event.target.value.replaceAll("%", "");
    }

    if (event.target.value.length > -1 && event.target.value.length <= 11) {
      if (event.target.value.charAt(event.target.value.length - 1) == ".") {
        input = input.slice(0, -1);
      } else {
        value = Array.from(event.target.value.replace(".", ""));
        before = value.slice(value.length - 2, value.length);
        after = [];
        if (inputData.type == "price" && value.length > 2) {
          after = value.slice(0, value.length - 2);
        }
        if (before.length == 1 && inputData.type == "price") {
          valFinal =
            (inputData.type == "price" ? after.join("") + ".0" : "") +
            before.join("");
        } else if (inputData.type == "price") {
          valFinal =
            (inputData.type == "price" ? after.join("") + "." : "") +
            before.join("");
        } else {
          valFinal = after + before;
        }

        if (inputData.type == "price") {
          input = formatCurrency.format(
            valFinal.replace("$", "").replace(",", "")
          );
        } else {
          input = `${event.target.value}`;
        }
      }

      if (inputData.type == "porcentual" && input > 100) {
        input = 100;
      }

      if (inputData.type == "porcentual") {
        input += `%`;
      }
      event.target.value = input;
      inputData.value = input;
      inputData.hasError = false;
      setMessage(event.target.value);
      if (isHandleBlur) {
        onBlur(inputData, index);
      }
    }
  }

  useEffect(() => {
    switch (inputData.type) {
      case "dropdown":
        setTimeout(() => {
          initFromDropDown();
        }, 500);
        break;
      case "dropdown-inline":
        initAcordeon();
        break;
    }
  }, [new Date().getTime()]);

  function initAcordeon() {
    let id: any = document.getElementById(`common-hdr-${inputData.id}`);
    if (!addListeners) {
      id.removeEventListener("click", openCurrAccordion); // Eliminar cualquier evento click anterior
      id.addEventListener("click", openCurrAccordion);
      setListeners(true);
    }
    //Use this as the callback if you would like no more than one dropdown to be open
    function openCurrAccordion(e) {
      let id: any = document.getElementById(`common-hdr-${inputData.id}`);
      console.log(id);

      let parent: any = id.parentElement;
      let article: any = id.nextElementSibling;

      if (!parent.classList.contains("open")) {
        parent.classList.add("open");
        parent.classList.remove("close");
        article.style.maxHeight = article.scrollHeight + "px";
      } else {
        parent.classList.remove("open");
        parent.classList.add("close");
      }
    }
  }

  function initFromDropDown() {
    const dropdowns = document.getElementById(
      `common-input-${inputData.id}-dropdown`
    );
    const form = document.getElementById(
      `common-form-${inputData.id}-dropdown`
    );
    // Check if Dropdowns are Exist
    // Loop Dropdowns and Create Custom Dropdown for each Select Element
    if (dropdowns) {
      createCustomDropdown(dropdowns);
    }

    // Check if Form Element Exist on Page
    if (form !== null) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
      });
    }
  }

  // Create Custom Dropdown
  function createCustomDropdown(dropdown) {
    // Get All Select Options
    // And Convert them from NodeList to Array
    const options = dropdown.querySelectorAll("option");
    const optionsArr = Array.prototype.slice.call(options);

    // Create Custom Dropdown Element and Add Class Dropdown
    const customDropdown = document.createElement("div");
    customDropdown.classList.add("dropdown");
    customDropdown.id = `${inputData.id}-customDropdown`;
    dropdown.classList.add("arsa-input");
    dropdown.insertAdjacentElement("afterend", customDropdown);

    // Create Element for Selected Option
    const selected = document.createElement("div");
    selected.id = `${inputData.id}-daselected`;
    selected.classList.add("dropdown-select");
    selected.innerHTML = inputData.dummyValue
      ? t(inputData.dummyValue)
      : optionsArr[0]?.textContent;
    customDropdown.appendChild(selected);

    // Create Element for Dropdown Menu
    // Add Class and Append it to Custom Dropdown
    const menu = document.createElement("div");
    menu.id = `${inputData.id}-dropdown-menu`;
    menu.classList.add("dropdown-menu");

    customDropdown.appendChild(menu);
    let idSelect: any = document.getElementById(`${inputData.id}-daselected`);

    idSelect.addEventListener("click", toggleDropdown);

    // Create Search Input Element
    const search = document.createElement("input");
    search.placeholder = "Search...";
    search.type = "text";
    search.classList.add("dropdown-menu-search");

    if (inputData.hasSearch) {
      menu.appendChild(search);
    }

    // Create Wrapper Element for Menu Items
    // Add Class and Append to Menu Element
    const menuInnerWrapper: any = document.createElement("div");
    menuInnerWrapper.id = `dropdown-menu-inner-${inputData.id}`;
    menuInnerWrapper.classList.add("dropdown-menu-inner");
    menu.appendChild(menuInnerWrapper);

    // Loop All Options and Create Custom Option for Each Option
    // And Append it to Inner Wrapper Element
    optionsArr.forEach((option, index: number) => {
      const item = document.createElement("div");
      try {
        item.classList.add("dropdown-menu-item");
        item.dataset.value = option.value;
        item.style.fontFamily = option.value;
        item.innerHTML = option?.innerHTML;
        if (index > 0) {
          menuInnerWrapper.appendChild(item);
          item.addEventListener(
            "click",
            setSelected.bind(item, selected, dropdown, menu)
          );
        }
      } catch (error) {}
    });

    // Add Selected Class to First Custom Select Option

    // Add Input Event to Search Input Element to Filter Items
    // Add Click Event to Element to Close Custom Dropdown if Clicked Outside
    // Hide the Original Dropdown(Select)
    if (inputData.hasSearch) {
      menuInnerWrapper.querySelector("div").classList.add("selected");
      search.addEventListener(
        "input",
        filterItems.bind(search, optionsArr, menu)
      );
    }
    document.addEventListener(
      "click",
      closeIfClickedOutside.bind(customDropdown, menu)
    );
    dropdown.style.display = "none";
  }

  // Toggle for Display and Hide Dropdown
  function toggleDropdown() {
    let idMenu: any = document.getElementById(`${inputData.id}-dropdown-menu`);

    if (idMenu.offsetParent !== null) {
      idMenu.style.display = "none";
    } else {
      idMenu.style.display = "block";
      try {
        idMenu.querySelector("input").focus();
      } catch (error) {}
    }
  }

  // Set Selected Option
  function setSelected(selected, dropdown, menu) {
    // Get Value and Label from Clicked Custom Option
    const value = this.dataset.value;
    const label = this.textContent;

    // Change the Text on Selected Element
    // Change the Value on Select Field

    selected.textContent = inputData.dummyValue ? inputData.dummyValue : label;
    dropdown.value = value;

    inputData.value = this.dataset.value;
    inputData.hasError = false;
    onChange(inputData, index);
    // Close the Menu
    // Reset Search Input Value
    // Remove Selected Class from Previously Selected Option
    // And Show All Div if they Were Filtered
    // Add Selected Class to Clicked Option
    menu.style.display = "none";
    try {
      menu.querySelector("input").value = "";
    } catch (error) {}
    menu.querySelectorAll("div").forEach((div) => {
      if (div.classList.contains("is-select")) {
        div.classList.remove("is-select");
      }
      if (div.offsetParent === null) {
        div.style.display = "block";
      }
    });
    this.classList.add("is-select");
  }

  // Filter the Items
  function filterItems(itemsArr, menu) {
    // Get All Custom Select Options
    // Get Value of Search Input
    // Get Filtered Items
    // Get the Indexes of Filtered Items
    const customOptions = document.getElementById(
      `dropdown-menu-inner-${inputData.id}`
    );
    const value = this.value.toLowerCase();
    const filteredItems = itemsArr.filter((item) =>
      item.value.toLowerCase().includes(value)
    );
    const indexesArr = filteredItems.map((item) => itemsArr.indexOf(item));

    // Check if Option is not Inside Indexes Array
    // And Hide it and if it is Inside Indexes Array and it is Hidden Show it
    itemsArr.forEach((option) => {
      if (!indexesArr.includes(itemsArr.indexOf(option))) {
        if (customOptions) {
          customOptions.style.display = "none";
        }
      } else {
        if (customOptions && customOptions.offsetParent === null) {
          customOptions.style.display = "block";
        }
      }
    });
  }

  // Close Dropdown if Clicked Outside Dropdown Element
  function closeIfClickedOutside(menu, e) {
    let idMenu: any = document.getElementById(`${inputData.id}-dropdown-menu`);
    if (
      idMenu.closest(".dropdown") === null &&
      idMenu !== this &&
      menu.offsetParent !== null
    ) {
      menu.style.display = "none";
    }
  }

  const renderType = () => {
    let input = <></>;
    switch (inputData.forceType ? inputData.forceType : inputData.type) {
      case "normal-select":
        input = (
          <div
            className="master-select"
            style={{
              position: "relative",
              marginBottom: "24px",
            }}
          >
            <select
              id={`common-input-${index}`}
              key={`common-key-${index}-${UtilService.getRandomInt(
                1,
                9999999
              )}`}
              className="input-select"
              name={`common-name-${index}`}
              value={inputEnter}
              onInput={handleChange}
            >
              {inputData.values!.map((op) => {
                return <option value={op.value}>{op.label}</option>;
              })}
            </select>
          </div>
        );
        break;
      case "text":
      case "price":
      case "date":
      case "date-timelocal":
      case "time":
        input = (
          <div
            className={`master-input ${
              inputData.extraComponent ? "inp-icon" : ""
            }`}
            style={{
              width: "100%",
            }}
          >
            {inputData.hasTopLabel && (
              <p className="top-label">{t(inputData.label!)}</p>
            )}
            {inputData.extraLeftComponent}
            {inputData.type == "date" ||
            inputData.type == "date-timelocal" ||
            inputData.type == "time" ? (
              <section className="bet">
                <div
                  className={`arsa-input film-date ${
                    inputData.hasError ? "round-error" : ""
                  }`}
                >
                  <input
                    type={inputData.type}
                    id={inputData.id}
                    value={inputData.value ? inputData.value : null}
                    placeholder={t(inputData.placeholder)}
                    maxLength={inputData.maxLength ? inputData.maxLength : 100}
                    onInput={handleChange}
                    onFocus={(event) => {
                      event.target.type = inputData.type;
                      event.target.showPicker();
                    }}
                    onBlur={(e) => {
                      e.target.type = "text";
                      if (onBlur) {
                        handleBlur(e);
                      }
                    }}
                    style={{
                      //width: inputData.extraComponent ? "calc(100% - 40px)" : "100%",
                      position: "relative",
                      width: inputData.type == "date" ? "200px" : "100%",
                    }}
                  />
                </div>
              </section>
            ) : (
              <input
                type={inputData.type}
                id={inputData.id}
                className={`arsa-input ${
                  inputData.hasError ? "round-error" : ""
                }`}
                value={inputData.value ? inputData.value : null}
                placeholder={t(inputData.placeholder)}
                maxLength={inputData.maxLength ? inputData.maxLength : 100}
                onInput={handleChange}
                onBlur={(e) => {
                  if (onBlur) {
                    handleBlur(e);
                  }
                }}
                style={{
                  //width: inputData.extraComponent ? "calc(100% - 40px)" : "100%",
                  position: "relative",
                  //width: inputData.type == "date" ? '200px' : '100%'
                }}
              />
            )}
            {inputData.extraComponent}
          </div>
        );
        break;
      case "between":
        input = (
          <div
            className={`${inputData.extraComponent ? "inp-icon" : ""}`}
            style={{
              width: "100%",
            }}
          >
            {inputData.hasTopLabel && (
              <p className="top-label">{t(inputData.label!)}</p>
            )}

            <section className="bet">
              <div
                className={`arsa-input film-date film-between ${
                  inputData.hasError ? "round-error" : ""
                }`}
              >
                {inputData.extraLeftComponent}
                <input
                  type={"text"}
                  id={`${inputData.id}-left`}
                  value={inputData.leftValue ? inputData.leftValue : null}
                  maxLength={inputData.maxLength ? inputData.maxLength : 100}
                  placeholder="MM/DD/YYYY"
                  onFocus={(event) => {
                    event.target.type = "date";
                    event.target.showPicker();
                  }}
                  onBlur={(e) => {
                    e.target.type = "text";
                    if (onBlur) {
                      handleBlur(e);
                    }
                  }}
                  style={{
                    //width: inputData.extraComponent ? "calc(100% - 40px)" : "100%",
                    position: "relative",
                    width: inputData.type == "date" ? "200px" : "100%",
                  }}
                />
              </div>
              <div
                className={`arsa-input film-date film-between ${
                  inputData.hasError ? "round-error" : ""
                }`}
              >
                {inputData.extraLeftComponent}
                <input
                  type={"text"}
                  id={inputData.id}
                  value={inputData.rightValue ? inputData.rightValue : null}
                  placeholder="MM/DD/YYYY"
                  maxLength={inputData.maxLength ? inputData.maxLength : 100}
                  onInput={handleChange}
                  onFocus={(event) => {
                    event.target.type = "date";
                    event.target.showPicker();
                  }}
                  onBlur={(e) => {
                    e.target.type = "text";
                    if (onBlur) {
                      handleBlur(e);
                    }
                  }}
                  style={{
                    //width: inputData.extraComponent ? "calc(100% - 40px)" : "100%",
                    position: "relative",
                    width: inputData.type == "date" ? "200px" : "100%",
                  }}
                />
              </div>
            </section>
            {inputData.extraComponent}
          </div>
        );
        break;

      case "password":
      case "passwordv2":
        input = (
          <div
            className={`${inputData.extraComponent ? "inp-icon" : "secret"}`}
          >
            {inputData.hasTopLabel && (
              <p className="top-label">{t(inputData.label!)}</p>
            )}
            {inputData.extraLeftComponent}
            <input
              type={view ? "text" : "password"}
              className={`arsa-input ${
                inputData.hasError ? "round-error" : ""
              }`}
              id={inputData.id ?? ''}
              value={inputData.value ? inputData.value : null}
              placeholder={t(inputData.placeholder)}
              maxLength={inputData.maxLength ? inputData.maxLength : 100}
              name={inputData?.name}
              onInput={handleChange}
              onBlur={(e) => {
                onBlur(e);
              }}
              style={{
                //width: inputData.extraComponent ? "calc(100% - 40px)" : "100%",
                position: "relative",
              }}
            />
            {inputData.hasEye && (
              <div
                className="icon-for-input"
                onClick={() => {
                  setView((c) => !c);
                }}
              >
                <img src={view ? iconSee : iconHide} alt="password" />
              </div>
            )}
            {!inputData.hasEye && inputData.extraComponent}
          </div>
        );
        break;
      case "text-float":
      case "password-float":
        input = (
          <div className={"form-group"}>
            <input
              id={`id-${t(inputData.placeholder)}`}
              type={inputData.type.replace("-float", "")}
              className={`input-tandem`}
              value={inputData.value ? inputData.value : null}
              placeholder=""
              maxLength={inputData.maxLength ? inputData.maxLength : 100}
              onInput={handleChange}
              style={{
                //width: inputData.extraComponent ? "calc(100% - 40px)" : "100%",
                position: "relative",
              }}
            />
            <label htmlFor={`id-${t(inputData.placeholder)}`}>
              {t(inputData.placeholder)}
            </label>
            {inputData.extraComponent}
          </div>
        );
        break;
      case "textarea":
        input = (
          <div
            className={`master-area ${
              inputData.extraComponent ? "inp-icon" : ""
            }`}
          >
            <textarea
              name=""
              id={inputData.id}
              value={inputData.value ? inputData.value : null}
              cols={inputData.cols ?? 30}
              rows={inputData.rows ?? 3}
              className={`arsa-input`}
              placeholder={t(inputData.placeholder)}
              onInput={handleChange}
              style={{
                width: inputData.extraComponent ? "calc(100% - 40px)" : "100%",
                height: "auto",
              }}
            />
            {inputData.extraComponent}
          </div>
        );
        break;
      case "radio":
        input = (
          <div
            className="master-radio"
            style={{
              position: "relative",
              marginBottom: "24px",
            }}
          >
            <label
              className="checkbox-checked"
              id={`common-input-${index}`}
              key={`common-key-${index}-${UtilService.getRandomInt(
                1,
                9999999
              )}`}
            >
              {t(inputData.label!)}
              <input
                type="checkbox"
                checked={inputData.value}
                onInput={handleChange}
                onChange={() => {}}
              />
              <span className="checkmark"></span>
            </label>
            {inputData.placeholder && inputData.placeholder.length > 0 && (
              <p className="checkbox-placeholder">{t(inputData.placeholder)}</p>
            )}
          </div>
        );
        break;
      case "radio-check":
        input = (
          <div
            className="master-radiocheck"
            style={{
              position: "relative",
              marginBottom: "24px",
            }}
          >
            <label
              className="checkbox-checked radio-check"
              id={`common-input-${index}`}
              key={`common-key-${index}-${UtilService.getRandomInt(
                1,
                9999999
              )}`}
            >
              {t(inputData.label!)}
              <input
                type="checkbox"
                checked={inputData.value}
                onInput={handleChange}
                onChange={() => {}}
              />
              <span className="checkmark"></span>
            </label>

            {inputData.placeholder &&
              inputData.placeholder.length > 0 &&
              !inputData.hasPlaceholder && (
                <p className="checkbox-placeholder">
                  {t(inputData.placeholder)}
                </p>
              )}
          </div>
        );
        break;
      case "checkbox":
        input = (
          <div
            className="master-checkbox"
            style={{
              position: "relative",
              marginBottom: "24px",
            }}
          >
            <label
              className="checkbox-checked square"
              id={`common-input-${index}`}
              key={`common-key-${index}-${UtilService.getRandomInt(
                1,
                9999999
              )}`}
            >
              {t(inputData.label!)}
              <input
                type="checkbox"
                value={inputData.value}
                checked={inputData.value}
                onInput={handleChange}
                onBlur={(e) => {
                  if (onBlur) {
                    handleBlur(e);
                  }
                }}
                onChange={() => {}}
              />
              <span className="checkmark"></span>
            </label>

            {inputData.placeholder && inputData.placeholder.length > 0 && (
              <p className="checkbox-placeholder">{t(inputData.placeholder)}</p>
            )}
          </div>
        );
        break;
      case "switch":
        input = !inputData.joinSwitch ? (
          <div
            className="switch"
            style={{
              position: "relative",
              marginBottom: "24px",
            }}
          >
            <label
              className="switch"
              id={`common-input-${index}`}
              key={`common-key-${index}-${UtilService.getRandomInt(
                1,
                9999999
              )}`}
            >
              <input
                type="checkbox"
                value={inputData.value}
                onInput={handleChange}
                onBlur={(e) => {
                  if (onBlur) {
                    handleBlur(e);
                  }
                }}
                onChange={() => {}}
              />
              <span
                className={`slider round ${inputData.value ? "check" : ""}`}
              ></span>
            </label>
            <p className="label">{t(inputData.label!)}</p>
            {inputData.placeholder && inputData.placeholder.length > 0 && (
              <p className="checkbox-placeholder">{t(inputData.placeholder)}</p>
            )}
          </div>
        ) : (
          <div
            className="switch"
            style={{
              position: "relative",
              marginBottom: "24px",
            }}
          >
            <section
              style={{
                position: "relative",
              }}
            >
              <label
                className="switch"
                id={`common-input-${index}`}
                key={`common-key-${index}-${UtilService.getRandomInt(
                  1,
                  9999999
                )}`}
              >
                <input
                  type="checkbox"
                  value={inputData.value}
                  onInput={handleChange}
                  onBlur={(e) => {
                    if (onBlur) {
                      handleBlur(e);
                    }
                  }}
                  onChange={() => {}}
                />
                <span
                  className={`slider round ${inputData.value ? "check" : ""}`}
                ></span>
              </label>
              {inputData.label && (
                <p className="label">{t(inputData.label!)}</p>
              )}
              {inputData.placeholder && inputData.placeholder.length > 0 && (
                <p className="checkbox-placeholder">
                  {t(inputData.placeholder)}
                </p>
              )}
            </section>
          </div>
        );
        break;
      case "dropdown":
        input = (
          <form
            className={`drowpdown-container ${inputData.extraClass}`}
            id={`common-form-${inputData.id}-dropdown`}
          >
            {inputData.hasTopLabel && (
              <p className="top-label">{t(inputData.label!)}</p>
            )}
            <div className="drowpdown-container-group">
              <span className="drowpdown-container-arrow">
                <img src={down} />
              </span>
              <select
                id={`common-input-${inputData.id}-dropdown`}
                key={`common-key-${index}-${UtilService.getRandomInt(
                  1,
                  9999999
                )}`}
                className={`arsa-input dropdown`}
                name={`common-name-${index}`}
                value={inputEnter}
                onInput={handleChange}
              >
                {inputData.values?.map((op) => {
                  return <option value={op.value}>{op.label}</option>;
                })}
              </select>
            </div>
          </form>
        );
        break;
      case "dropdown-inline":
        input = (
          <>
            {inputData.hasTopLabel && (
              <p
                className="top-label"
                style={{
                  marginBottom: "-8px",
                }}
              >
                {t(inputData.label!)}
              </p>
            )}
            <div className={`dropdown-inline close ${inputData.extraClass}`}>
              <header className="clearfix" id={`common-hdr-${inputData.id}`}>
                <p>{t(inputData.placeholder!)}</p>
                <img src={down} className="expand" />
              </header>
              <article>
                <div className="article-inner">
                  <ul className="dotless">
                    {inputData.values?.map((op) => {
                      return (
                        <li
                          onClick={(e) => {
                            inputData.values?.forEach((value: any) => {
                              value.selected = false;
                            });
                            op.selected = true;
                            inputData.placeholder = op.optionValue
                              ? op.optionValue
                              : t(inputData.placeholder);
                            handleChange(e);
                          }}
                        >
                          {t(op.label)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            </div>
          </>
        );

        /* input = (
          <form
            className={`drowpdown-container dropinline ${inputData.extraClass}`}
            id={idGlb}
          >
            <div className="drowpdown-container-group">
              <span className="drowpdown-container-arrow">
                <img src={down} />
              </span>
              <select
                id={`common-input-${index}`}
                key={`common-key-${index}-${UtilService.getRandomInt(1,9999999)}`}
                className={`film-input dropdown`}
                name={`common-name-${index}`}
                value={inputEnter}
                onInput={handleChange}
              >
                {inputData.values?.map((op) => {
                  return <option value={op.value}>{op.label}</option>;
                })}
              </select>
            </div>
          </form>
        ); */

        break;
    }
    return input;
  };

  return (
    <section
      className={`${globalExtraClass} ${extraClass} ${
        inputData.globalExtraClass
      } gp-form ${inputData.type == "between" ? "between-dates" : ""}`}
    >
      {renderType()}
      {inputData.required && inputData.hasError ? (
        <p className="error">{inputData.errorMessage}</p>
      ) : (
        <></>
      )}
    </section>
  );
}

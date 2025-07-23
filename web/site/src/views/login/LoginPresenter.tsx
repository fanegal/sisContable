import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { AlertService, Button, Form, LoadingService, LocalStorageEncryptService, useDeviceDetect, useTheme, useUserSession } from "common-lib";
import { httpService } from "@/services/HttpAppService";
import { environment } from "@/environment/environment.prod";
import { useNavigate } from "react-router-dom";

export function useLoginPresenter() {
    const device: any = useDeviceDetect();
    const theme: any = useTheme();
    const { t, i18n } = useTranslation();
    const formRef = useRef(new Date().getTime());
    const [form, setForm] = useState<any>([]);

    const formRef2 = useRef(new Date().getTime());
    const [form2, setForm2] = useState<any>([]);

    const [entes, setEntes] = useState<any>([]);
    const session = useUserSession();
    const navigate = useNavigate();
    const [swiperData, setSwiperData] = useState<any>([
        {
            img: "/login/slide1.png"
        },
        {
            img: "/login/slide2.png"
        },
        {
            img: "/login/slide3.png"
        }
    ]);

    useEffect(() => {
        if (LocalStorageEncryptService.getFromLocalStorage("userSession", true)) {

        }
        fillForm();
        fillEntes()

    }, [theme]);

    function fillForm(entes: any = []) {
        setForm([
            {
                type: "text",
                value: null,
                label: "login.username",
                placeholder: "Supervisor",
                id: "subjectf",
                required: true,
                hasTopLabel: true,
                hasError: false,
                maxLength: 10,
                error: "invite.errors.name",
                globalExtraClass: "invite-input",
                extraLeftComponent: (
                    <div className="custom-icon-left" style={{
                        background: theme.theme.color
                    }}>

                        <span className="material-symbols-outlined" style={{
                            color: theme.theme.primary
                        }}>key</span>
                    </div>
                ),
            },
            {
                type: "password",
                value: null,
                label: "login.password",
                placeholder: "Contraseña",
                required: true,
                id: "subjectf2",
                hasTopLabel: true,
                hasError: false,
                error: "invite.errors.name",
                globalExtraClass: "invite-input",
                hasEye: false,
                extraLeftComponent: (
                    <div className="custom-icon-left" style={{
                        background: theme.theme.color
                    }}>
                        <span className="material-icons-outlined" style={{
                            color: theme.theme.primary
                        }}>key</span>
                    </div>
                ),
                extraComponent: (
                    <div className="custom-icon-right" style={{
                        background: theme.theme.color
                    }} onClick={() => togglePassword()} id="eye1">
                        <span className="material-symbols-outlined" style={{
                            color: theme.theme.primary
                        }}>visibility</span>
                    </div>
                ),
            },

            {
                type: "select",
                value: null,
                label: "login.ente",
                placeholder: "Supervisor",
                id: "subjectf",
                required: true,
                hasTopLabel: true,
                hasError: false,
                maxLength: 10,
                values: entes,
                error: "invite.errors.name",
                globalExtraClass: "invite-input",
                defaultOption: true,
                extraLeftComponent: (
                    <div className="custom-icon-left" style={{
                        background: theme.theme.color
                    }}>

                        <span className="material-symbols-outlined" style={{
                            color: theme.theme.primary
                        }}>robot</span>
                    </div>
                ),
            },
        ]);
    }

    async function fillEntes() {

        LoadingService.show()
        let entesCopy: any = [];
        try {
            let response: any = await httpService.post(environment.getUsersByPagination, {
                "page": 1,
                "limit": 9999,
                "order_by": "id",
                "order_dir": "asc",
                "filter_logic": "or",
                "filters": {
                },
                "fixed_filters": {
                    "id_company": "5"
                },
                "fields": "id,username,email,name,custom_data"
            });

            console.log(response);
            entesCopy = [];
            response?.data?.items?.forEach((item: any) => {
                if (item.custom_data) {
                    let customData: any = JSON.parse(item.custom_data);

                    const enteValue = customData.ente?.value;
                    const enteName = customData.ente?.name;

                    if (
                        enteValue != null &&
                        !entesCopy.some((e) => e.value === enteValue)
                    ) {
                        entesCopy.push({
                            value: enteValue,
                            label: enteName,
                        });
                    }
                }
            });

            setEntes(entesCopy)

        } catch (error) {

        }

        fillForm(entesCopy);
        LoadingService.hide()
    }

    function togglePassword() {
        let eye = document.getElementById("eye1");
        let pass: any = document.getElementById("subjectf2");
        if (eye && pass) {
            if (eye.children[0].innerHTML === 'visibility') {
                eye.children[0].innerHTML = 'visibility_off';
                pass.type = 'text';
            } else {
                eye.children[0].innerHTML = 'visibility';
                pass.type = 'password';
            }
        }
    }

    function toggleForm() {
        const container: any = document.querySelector(".container");
        if (container) container.classList.toggle("active");
    }

    async function onSubmit() {
        AlertService.showWithComponent({
                            title: t("login.select-exercise"),
                            component: <section className="exercise">
                                <Form
                                    data={[

                                        {
                                            type: "select",
                                            value: null,
                                            label: "login.ente",
                                            placeholder: "Supervisor",
                                            id: "ejercicio",
                                            required: true,
                                            hasTopLabel: true,
                                            hasError: false,
                                            maxLength: 10,
                                            values: Array.from({ length: 5 }, (_, i) => {
                                                const year = new Date().getFullYear() - 4 + i;
                                                return { label: year, value: year };
                                            }),
                                            error: "invite.errors.name",
                                            globalExtraClass: "invite-input",
                                            defaultOption: true,
                                            extraLeftComponent: (
                                                <div className="custom-icon-left" style={{
                                                    background: theme.theme.color
                                                }}>

                                                    <span className="material-symbols-outlined" style={{
                                                        color: theme.theme.primary
                                                    }}>calendar_today</span>
                                                </div>
                                            ),
                                        },
                                    ]}
                                    form={formRef2}
                                    hasAction={true}
                                    buttonAction={() => {
                                    }}
                                    buttonDisable={false}
                                    buttonText={t("login.login")}
                                    extraClass={"about-form"}
                                    onChangeForm={(e, index) => {
                                    }}
                                    onBlurForm={(e) => {
                                    }}
                                ></Form>
                            </section>,
                            cssClass:"selected-exercise"
                        });
        let loginForm = [...form]
        let errors: number = 0;
        let updatedForm = form.map((item: any) => {
            if (!item.value || item.value.length <= 0) {
                errors++;
                return { ...item, hasError: true, errorMessage: t("errors.required") };
            }
            return { ...item, hasError: false };
        });
        console.log(loginForm);

        setForm(updatedForm)
        if (errors == 0) {
            let request = {
                username: loginForm[0].value,
                password: loginForm[1].value
            };
            LoadingService.show()
            let response: any = await httpService.post(environment.login, request);

            if (response.code != 200) {
                LoadingService.hide()
                AlertService.toast({
                    message: response.message,
                    durationMs: 3000, // 3 segundos
                    position: 'bottom-end', // esquina inferior derecha
                    level: 'warn'
                });
            } else {
                let user: any = response.data;
                user.customData = JSON.parse(user.customData)
                if (user.customData.ente.value == loginForm[2].value) {

                    LoadingService.show()
                    setTimeout(() => {
                        LoadingService.hide()
                        AlertService.showWithComponent({
                            title: t("login.select-exercise"),
                            component: <section className="exercise">
                                <Form
                                    data={[

                                        {
                                            type: "select",
                                            value: null,
                                            label: "login.ente",
                                            placeholder: "Supervisor",
                                            id: "ejercicio",
                                            required: true,
                                            hasTopLabel: true,
                                            hasError: false,
                                            maxLength: 10,
                                            values: Array.from({ length: 5 }, (_, i) => {
                                                const year = new Date().getFullYear() - 4 + i;
                                                return { label: year, value: year };
                                            }),
                                            error: "invite.errors.name",
                                            globalExtraClass: "invite-input",
                                            defaultOption: true,
                                            extraLeftComponent: (
                                                <div className="custom-icon-left" style={{
                                                    background: theme.theme.color
                                                }}>

                                                    <span className="material-symbols-outlined" style={{
                                                        color: theme.theme.primary
                                                    }}>calendar_today</span>
                                                </div>
                                            ),
                                        },
                                    ]}
                                    form={formRef2}
                                    hasAction={true}
                                    buttonAction={() => {
                                        AlertService.toast({
                                            message: `Bienvenido ${response.data.name}`,
                                            durationMs: 3000, // 3 segundos
                                            position: 'bottom-end', // esquina inferior derecha
                                            level: 'success'
                                        });
                                        response.data.addition = btoa(loginForm[1].value)
                                        LocalStorageEncryptService.setToLocalStorage("userSession", response.data, true)
                                        navigate('/home')
                                    }}
                                    buttonDisable={false}
                                    buttonText={t("login.login")}
                                    extraClass={"about-form"}
                                    onChangeForm={(e, index) => {
                                    }}
                                    onBlurForm={(e) => {
                                    }}
                                ></Form>
                            </section>
                        });
                    }, 800);
                } else {
                    LoadingService.hide()
                    loginForm[2].hasError = true
                    loginForm[2].errorMessage = t("login.no-access")
                    setForm(loginForm)
                }

            }

        }
    }

    function goRegister() {
        //router.push("/register")
    }

    return {
        form,
        formRef,
        t,
        toggleForm,
        onSubmit,
        swiperData,
        goRegister
    };
}

import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';
import { AlertService, LoadingService, LocalStorageEncryptService, useDeviceDetect, useTheme, useUserSession } from "common-lib";
import { httpService } from "@/services/HttpAppService";
import { environment } from "@/environment/environment.prod";
import { useNavigate } from "react-router-dom";

export function useLoginPresenter() {
    const device: any = useDeviceDetect();
    const theme: any = useTheme();
    const { t, i18n } = useTranslation();
    const formRef = useRef(new Date().getTime());
    const [form, setForm] = useState<any>([]);
    const navigate = useNavigate();
    const session = useUserSession();

    useEffect(() => {
        if(LocalStorageEncryptService.getFromLocalStorage("userSession", true)){
            navigate(-1)
        }
        setForm([
            {
                type: "text",
                value: null,
                label: "login.username",
                placeholder: "arsa@gmail.com",
                id: "subjectf",
                required: true,
                hasTopLabel: true,
                hasError: false,
                error: "invite.errors.name",
                globalExtraClass: "invite-input",
                extraLeftComponent: (
                    <div className="custom-icon-left" style={{
                        background: theme.theme.color
                    }}>
                        <span className="material-icons-outlined" style={{
                            color: theme.theme.componentColor
                        }}>photo_camera</span>
                    </div>
                ),
            },
            {
                type: "password",
                value: null,
                label: "login.password",
                placeholder: "Ej3mpl0!",
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
                            color: theme.theme.componentColor
                        }}>key</span>
                    </div>
                ),
                extraComponent: (
                    <div className="custom-icon-right" style={{
                        background: theme.theme.color
                    }} onClick={() => togglePassword()}>
                        <span className="material-icons-outlined" style={{
                            color: theme.theme.componentColor
                        }} id="eye1">visibility</span>
                    </div>
                ),
            },
        ]);
    }, [theme]);

    function togglePassword() {
        let eye = document.getElementById("eye1");
        let pass: any = document.getElementById("subjectf2");
        if (eye && pass) {
            if (eye.innerHTML === 'visibility') {
                eye.innerHTML = 'visibility_off';
                pass.type = 'text';
            } else {
                eye.innerHTML = 'visibility';
                pass.type = 'password';
            }
        }
    }

    function toggleForm() {
        const container: any = document.querySelector(".container");
        if (container) container.classList.toggle("active");
    }

    async function onSubmit() {
        console.log("click");
        console.log(form);
        let loginForm = [...form]
        let errors: number = 0;
        let updatedForm = form.map((item: any) => {
            if (!item.value || item.value.length <= 0) {
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
                console.log("alert");
                console.log(response);
                AlertService.toast({
                    message: response.message,
                    durationMs: 3000, // 3 segundos
                    position: 'bottom-end', // esquina inferior derecha
                    level: 'warn'
                });
            } else {
                AlertService.toast({
                    message: `Bienvenido ${response.data.name}`,
                    durationMs: 3000, // 3 segundos
                    position: 'bottom-end', // esquina inferior derecha
                    level: 'success'
                });
                response.data.addition = btoa(loginForm[1].value)
                LocalStorageEncryptService.setToLocalStorage("userSession", response.data, true)
                navigate('/home')
            }
            LoadingService.hide()
        }
    }

    return {
        form,
        formRef,
        t,
        toggleForm,
        onSubmit
    };
}

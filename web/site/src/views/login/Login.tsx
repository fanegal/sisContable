import { useEffect, useRef, useState } from "react";
import "./login.scss";
import { useTranslation } from 'react-i18next';
import { Form, Icon, useDeviceDetect, useTheme, useUserSession } from "common-lib";

export default function Login({ }) {
    const device: any = useDeviceDetect();
    const theme: any = useTheme();
    const { t, i18n } = useTranslation();
    const formRef = useRef(new Date().getTime());
    const [form, setForm] = useState<any>([]);

    const session = useUserSession();

    const [loginData, setLoginData] = useState({
        username: {
            value: '',
            error: false,
            maxLength: 20
        },
        password: {
            value: '',
            error: false,
            maxLength: 20
        }
    })

    useEffect(() => {
        console.log(theme);

        setForm([
            {
                type: "text",
                value: null,
                label: "about.subject",
                placeholder: "about.subject2",
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
                label: "about.what",
                placeholder: "about.what",
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
                    }} onClick={() => {
                        let eye = document.getElementById("eye1");
                        let pass:any = document.getElementById("subjectf2")
                        if (eye!.innerHTML == 'visibility') {
                            eye!.innerHTML = 'visibility_off';
                            pass!.type = 'text';
                        } else {
                            eye!.innerHTML = 'visibility';
                            pass!.type = 'password';
                        }
                    }}>
                        <span className="material-icons-outlined" style={{
                            color: theme.theme.componentColor
                        }} id="eye1">visibility</span>
                    </div>
                ),
            },
        ])
    }, [theme])

    function toggleForm() {
        const container: any = document.querySelector(".container");
        container.classList.toggle("active");
    };

    return <section className="login">
        <section id="reg_login">
            <div className="lefonde"></div>
            <div className="container">
                <div className="user signinBx">
                    <div className="imgBx"><img src="/login1.png" alt="" /></div>
                    <div className="formBx">
                        <section className="form">
                            <h2>Login</h2>
                            <Form
                                data={form}
                                form={formRef}
                                hasAction={true}
                                buttonAction={() => {
                                    console.log("click");

                                }}
                                buttonText={t("login.login")}
                                extraClass={"about-form"}
                                onChangeForm={(e, index) => { }}
                            ></Form>
                            {/* <p className="signup">
                                {t('login.not-account')}
                                <a href="#" onClick={() => {
                                    toggleForm();
                                }}> {t('login.register')}.</a>
                            </p> */}
                        </section>
                    </div>
                </div>
                <div className="user signupBx">
                    <div className="formBx">
                        <section className="form" >
                            <h2>Create an account</h2>
                            <input type="text" name="Username" placeholder="Username" required />
                            <input type="email" name="email" placeholder="Email Address" required />
                            <input type="password" name="crpass" placeholder="Create Password" required />
                            <input type="password" name="conpass" placeholder="Confirm Password" required />
                            <input type="submit" name="signup" value="Sign Up" />
                            <p className="signup">
                                Already have an account ?
                                <a href="#" onClick={() => {
                                    toggleForm();
                                }}>Sign in.</a>
                            </p>
                        </section>
                    </div>
                    <div className="imgBx"><img src="/login2.jpg" alt="" /></div>
                </div>
            </div>
        </section>
    </section>
}
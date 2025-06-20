import { Form } from "common-lib";
import "./login.scss";
import { useLoginPresenter } from "./LoginPresenter";

export default function Login() {
    const { form, formRef, t, toggleForm, onSubmit } = useLoginPresenter();

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
                                buttonAction={onSubmit}
                                buttonText={t("login.login")}
                                extraClass={"about-form"}
                                onChangeForm={() => { }}
                                onBlurForm={() => {

                                }}
                            ></Form>
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
                                <a href="#" onClick={toggleForm}>Sign in.</a>
                            </p>
                        </section>
                    </div>
                    <div className="imgBx"><img src="/login2.jpg" alt="" /></div>
                </div>
            </div>
        </section>
    </section>
}

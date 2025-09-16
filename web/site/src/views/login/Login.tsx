import "./login.scss";
import { useLoginPresenter } from "./LoginPresenter";
import { CustomSwiper, Form, LayoutApp } from "common-lib";
import "./login.scss";

export default function Login() {
    const { form, formRef, t, toggleForm, onSubmit, swiperData, goRegister } = useLoginPresenter();

    //return <LayoutApp logoSrc="/arsa-light-alpha.png" extraClass="login-layout">
    return <LayoutApp extraClass="login-layout">
        <section className="login">
            <CustomSwiper
                title="Destacados"
                subtitle="Nuestros productos estrella"
                hasTitle={false}
                hasPagination={true}
                hasArrow={false}
                hasScrollbar={false}
                loop={true}
                autoplay={true}
                slidesPerView={1}
                spaceBetween={10}

                cssClass="login-swiper"
            >
                {
                    swiperData.map(s => <div className="swiper-slide">
                        <div className="login-background">
                            <img src={s.img} alt="" />
                        </div>
                    </div>)
                }

            </CustomSwiper>

            <section className="form">

                <p className="title">{t("login.title")}</p>
                <p className="description">{t("login.description")}</p>
                <Form
                    data={form}
                    form={formRef}
                    hasAction={true}
                    buttonAction={onSubmit}
                    buttonDisable={false}
                    buttonText={t("login.login")}
                    extraClass={"about-form"}
                    onChangeForm={(e, index) => {
                        console.log(e);
                        console.log(index);

                    }}
                    onBlurForm={(e) => {
                        if (e.id = "password") {

                        }
                    }}
                ></Form>
            </section>
        </section>
    </LayoutApp>
}

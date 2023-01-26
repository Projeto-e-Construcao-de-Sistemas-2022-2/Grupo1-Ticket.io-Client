import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Navigate, Link } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import "./style.css";

function Login() {
  const {
    signInGoogle,
    signInPassword,
    createAcc,
    passwordReset,
    signed
  } = useContext(AuthGoogleContext);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [login, setLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  async function onLoginSubmit(e) {
    setErrorMessage(await signInPassword(e.email, e.password));
  }

  async function onRegisterSubmit(e) {
    setErrorMessage(await createAcc(e.email, e.password));
  }

  async function onResetSubmit(e) {
    await passwordReset(e.email).then((res) => {
      if (res === "200") {
        setForgotPassword(false);
      } else {
        setErrorMessage(res);
      }
    });
  }

  async function handleLoginFromGoogle() {
    setErrorMessage(await signInGoogle());
  }

  useEffect(() => {
    setErrorMessage("");
  }, [forgotPassword, login]);

  if (!signed) {
    return (
      <>
        <div className="login-container row d-flex align-items-center m-0">
          <div className="btn row d-flex align-items-center m-auto col-10 col-md-6 col-lg-5 col-xl-4 bg-primary text-light">
            {forgotPassword ? (
              // Tela de redefinir senha
              <form
                onSubmit={handleSubmit(onResetSubmit)}
                className="row d-flex align-items-center m-auto"
              >
                <p className="mt-3 mb-4 text-center fs-3 text-uppercase user-select-none">
                  Redefinir senha
                </p>
                <label htmlFor="email" className="fs-6">
                  E-mail cadastrado
                </label>
                <input
                  name="email"
                  placeholder="usuario@email.com"
                  id="email"
                  className="form-control mb-1"
                  {...register("email", {
                    required: "Campo vazio",
                    minLength: {
                      value: 8,
                      message: "E-mail inválido"
                    },
                    maxLength: {
                      value: 40,
                      message: "E-mail inválido"
                    },
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "E-mail inválido"
                    }
                  })}
                />
                <p className="text-warning">{errors?.email?.message}</p>
                <button type="submit" className="mb-4 btn btn-outline-light">
                  Enviar redefinição de senha
                </button>
                <p role="alert" hidden={!errorMessage} className={"text-center alert-dismissible alert alert-"+(errorMessage.slice(0,2)==="E-" ? "success":"warning ")}>
                  <span>{errorMessage}</span>
                  <button type="button" class="btn-close" onClick={()=>setErrorMessage("")}></button>
                </p>
                <Link
                  to="#"
                  className="my-1 p-1 w-100 link-light text-center"
                  onClick={() => {
                    setForgotPassword(false);
                  }}
                >
                  Fazer login
                </Link>
              </form>
            ) : login ? (
              // Tela de login
              <form
                onSubmit={handleSubmit(onLoginSubmit)}
                className="row d-flex align-items-center m-auto"
              >
                <p className="mt-3 mb-4 text-center fs-3 text-uppercase user-select-none">
                  Entrar
                </p>
                <button
                  className="btn btn-outline-light d-inline-flex align-items-center justify-content-center"
                  onClick={handleLoginFromGoogle}
                  type="button"
                >
                  <img
                    className="mx-2"
                    alt="Google logo"
                    height="24"
                    width="24"
                    src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg"
                  />
                  Autenticar-se com Google
                </button>
                <p className="mt-3 text-center user-select-none">ou</p>
                <label htmlFor="email" className="fs-6">
                  E-mail
                </label>
                <input
                  name="email"
                  placeholder="usuario@email.com"
                  id="email"
                  className="form-control mb-1"
                  {...register("email", {
                    required: "Campo vazio",
                    minLength: {
                      value: 3,
                      message: "Formato de e-mail inválido"
                    },
                    maxLength: {
                      value: 40,
                      message: "Formato de e-mail inválido"
                    },
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Formato de e-mail inválido"
                    }
                  })}
                />
                <p className="text-warning">{errors?.email?.message}</p>
                <label htmlFor="password" className="fs-6">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••"
                  id="password"
                  className="form-control mb-1"
                  {...register("password", {
                    required: "Campo vazio",
                    minLength: {
                      value: 1,
                      message: "Campo vazio"
                    },
                    pattern: {
                      value: /^(.*?)/,
                      message: "Campo vazio"
                    }
                  })}
                />
                <p className="text-warning">{errors?.password?.message}</p>
                <button type="submit" className="mb-2 btn btn-outline-light">
                  Login
                </button>
                <p role="alert" hidden={!errorMessage} className="text-center alert-dismissible alert alert-warning">
                  <span>{errorMessage}</span>
                  <button type="button" class="btn-close" onClick={()=>setErrorMessage("")}></button>
                </p>
                <Link
                  to="#"
                  className="my-1 p-1 w-100 link-light text-center"
                  onClick={() => {
                    setForgotPassword(true);
                  }}
                >
                  Esqueci a senha
                </Link>
                <Link
                  to="#"
                  className="my-1 p-1 w-100 link-light text-center"
                  onClick={() => {
                    setLogin(!login);
                  }}
                >
                  Cadastrar-se
                </Link>
              </form>
            ) : (
              // Tela de cadastro
              <form
                onSubmit={handleSubmit(onRegisterSubmit)}
                className="row d-flex align-items-center m-auto"
              >
                <p className="mt-3 mb-4 text-center fs-3 text-uppercase user-select-none">
                  CADASTRAR
                </p>
                <label htmlFor="email" className="fs-6">
                  E-mail
                </label>
                <input
                  name="email"
                  placeholder="usuario@email.com"
                  id="email"
                  className="form-control mb-1"
                  {...register("email", {
                    required: "Campo vazio",
                    minLength: {
                      value: 8,
                      message: "E-mail inválido"
                    },
                    maxLength: {
                      value: 40,
                      message: "E-mail inválido"
                    },
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "E-mail inválido"
                    }
                  })}
                />
                <p className="text-warning">{errors?.email?.message}</p>
                <label htmlFor="password" className="fs-6">
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="digite uma senha forte"
                  id="password"
                  className="form-control mb-1"
                  {...register("password", {
                    required: "Campo vazio",
                    minLength: {
                      value: 6,
                      message: "Senha deve possuir ao menos 6 caracteres"
                    },
                    pattern: {
                      value: /^(?=.*?\d)(?=.*?[a-zA-Z])[a-zA-Z\d]+$/,
                      message: "Senha deve possuir ao menos um número e uma letra"
                    }
                  })}
                />
                <p className="text-warning">{errors?.password?.message}</p>
                <label htmlFor="password2" className="fs-6">
                  Confirmar senha
                </label>
                <input
                  type="password"
                  name="password2"
                  placeholder="repita a senha"
                  id="password2"
                  className="form-control mb-1"
                  {...register("password2", {
                    validate: (val) => {
                      if (watch("password") !== val) {
                        return "Senhas não coincidem";
                      }
                    }
                  })}
                />
                <p className="text-warning">{errors?.password2?.message}</p>
                <button type="submit" className="mb-2 btn btn-outline-light">
                  Cadastrar-se
                </button>
                <p role="alert" hidden={!errorMessage} className="text-center alert-dismissible alert alert-warning">
                  <span>{errorMessage}</span>
                  <button type="button" class="btn-close" onClick={()=>setErrorMessage("")}></button>
                </p>
                <Link
                  to="#"
                  className="my-1 p-1 w-100 link-light text-center"
                  onClick={() => {
                    setLogin(!login);
                  }}
                >
                  Já possuo cadastro
                </Link>
              </form>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default Login;

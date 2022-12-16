import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import "./style.css";

function Complete() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const { user, signed } = useContext(AuthGoogleContext);
  const navigate = useNavigate();

  if (!signed || !user) return <Navigate to="/login" />;

  let postData = async (data) => {
    await axios
      .post(process.env.REACT_APP_SERVER + "/user", data)
      .then(function (res) {
        user.authorized = true;
        localStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = (e) => {
    postData(e);
  };

  if (!user.authorized)
    return (
      <>
        <div
          className="login-container row d-flex align-items-center m-0"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 0,
            width: "100%",
            height: "100%"
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="rounded row d-flex align-items-center m-auto col-10 col-md-6 col-lg-5 col-xl-3 bg-primary text-light p-4 p-md-5 ">
              <p className="mt-3 mb-4 text-center fs-3 text-uppercase user-select-none">
                Completar cadastro
              </p>
              <label htmlFor="name" className="fs-6">
                Nome completo
              </label>
              <input
                type="text"
                readOnly={user.displayName}
                name="name"
                id="name"
                className={
                  "form-control mb-3" +
                  (user.displayName ? " bg-dark text-light" : "")
                }
                value={user.displayName}
                {...register("name", {
                  required: "Campo obrigatório",
                  minLength: {
                    value: 8,
                    message: "Pelo menos 8 caracteres"
                  },
                  maxLength: {
                    value: 40,
                    message: "No máximo 40 caracteres, se possível abrevie"
                  }
                })}
              />
              <p className="text-warning">{errors?.name?.message}</p>
              <label htmlFor="email" className="fs-6">
                E-mail
              </label>
              <input
                type="email"
                readOnly
                name="email"
                id="email"
                className="form-control bg-dark text-light mb-3"
                value={user.email}
                {...register("email")}
              />
              <label htmlFor="cpf" className="fs-6">
                CPF
              </label>
              <input
                type="number"
                name="cpf"
                id="cpf"
                className="form-control mb-3"
                {...register("cpf", {
                  required: "Campo obrigatório",
                  minLength: {
                    value: 11,
                    message: "11 digitos!"
                  },
                  maxLength: {
                    value: 11,
                    message: "11 digitos!"
                  },
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Apenas caracteres numéricos"
                  }
                })}
              />
              <p className="text-warning">{errors?.cpf?.message}</p>
              <label htmlFor="cep" className="fs-6">
                CEP
              </label>
              <input
                type="number"
                name="cep"
                id="cep"
                className="form-control mb-3"
                {...register("cep", {
                  required: "Campo obrigatório",
                  minLength: {
                    value: 8,
                    message: "8 digitos!"
                  },
                  maxLength: {
                    value: 8,
                    message: "8 digitos!"
                  },
                  pattern: {
                    value: /^[0-9]+$/i,
                    message: "Apenas caracteres numéricos"
                  }
                })}
              />
              <p className="text-warning">{errors?.cep?.message}</p>
              <button type="submit" className="mb-5 btn btn-outline-light">
                Finalizar
              </button>
            </div>
          </form>
        </div>
      </>
    );
  else return <Navigate to="/" />;
}

export default Complete;

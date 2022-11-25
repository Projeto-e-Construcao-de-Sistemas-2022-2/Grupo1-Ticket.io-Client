import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthGoogleContext } from "../../contexts/authGoogle";

function Login() {
  const { signInGoogle, signed } = useContext(AuthGoogleContext);
  async function handleLoginFromGoogle() {
    await signInGoogle();
  }
  if (!signed) {
    return (
      <>
        <div 
          className="login-container row d-flex align-items-center m-0" 
          style={{ position:'absolute', top:0, left:0, zIndex:999999, width:'100%', height:'100%'}}
        >
          <div className="rounded row d-flex align-items-center m-auto col-10 col-md-6 col-lg-5 col-xl-3 bg-primary text-light p-4 p-md-5 ">
            <p className="mt-3 mb-4 text-center fs-3 text-uppercase user-select-none">Entrar</p>
            <button className="btn btn-outline-light d-inline-flex align-items-center justify-content-center" onClick={handleLoginFromGoogle}>
              <img className="mx-2" height="24" width="24" src="https://cdn.cdnlogo.com/logos/g/35/google-icon.svg" /> 
              Logar com Google 
            </button>
            <p className="mt-3 text-center user-select-none">ou</p>
            <label htmlFor="email" className="fs-6">E-mail</label>
            <input type="email" name="email" placeholder="usuario@email.com" id="email" className="form-control mb-3" />
            <label htmlFor="password" className="fs-6">Senha</label>
            <input type="password" name="password" placeholder="pudim123" id="password" className="form-control mb-3" />
            <button className="mb-5 btn btn-outline-light">Login</button>
          </div>
        </div>
      </>
    )
  } else {
    return <Navigate to="/" />;
  }
};

export default Login;
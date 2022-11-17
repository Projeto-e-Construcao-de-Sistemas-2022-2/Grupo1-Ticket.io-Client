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
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
          <h1 className="h2">Autenticar-se</h1>
        </div>
        <p>Você não está logado no sistema, para se autenticar ou se cadastrar, clique no botão abaixo</p>
        <button className="btn btn-primary" onClick={handleLoginFromGoogle}><img height="16" width="16" src="https://cdn.simpleicons.org/google/white" /> Logar com o Google</button>
        
      </>
    )
  } else {
    return <Navigate to="/" />;
  }
};

export default Login;
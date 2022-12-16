import { useState, createContext, useEffect } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { app, db } from "../services/FirebaseConfig";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const provider = new GoogleAuthProvider();
export const AuthGoogleContext = createContext({});
export const AuthGoogleProvider = ({ children }) => {
  const auth = getAuth(app);
  const { navigate } = useNavigate();
  const [user, setUser] = useState(
    localStorage.getItem("@AuthFirebase:user") !== null
      ? JSON.parse(localStorage.getItem("@AuthFirebase:user"))
      : null
  );

  useEffect(() => {
    const loadStorageData = () => {
      const storageUser = JSON.parse(
        localStorage.getItem("@AuthFirebase:user")
      );
      const storageToken = localStorage.getItem("@AuthFirebase:token");
      if (storageToken && storageUser) {
        setUser(storageUser);
      }
    };
    loadStorageData();
  }, []);

  async function signInGoogle() {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        axios
          .get(process.env.REACT_APP_SERVER + "/user?email=" + user.email)
          .then(function (res) {
            let usr = {
              ...user,
              localData: res.data.results,
              authorized: res.data.results ? true : false
            };
            setUser(usr);
            localStorage.setItem("@AuthFirebase:token", token);
            localStorage.setItem("@AuthFirebase:user", JSON.stringify(usr));
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  async function signInPassword(email, password) {
    return await signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const credential = result;
        const token = credential.accessToken;
        const user = result.user;
        axios
          .get(process.env.REACT_APP_SERVER + "/user?email=" + user.email)
          .then(function (res) {
            let usr = {
              ...user,
              localData: res.data.results,
              authorized: res.data.results ? true : false
            };
            setUser(usr);
            localStorage.setItem("@AuthFirebase:token", token);
            localStorage.setItem("@AuthFirebase:user", JSON.stringify(usr));
            return "";
          })
          .catch((error) => {
            console.error(error);
            return "Erro interno: confira os dados ou tente mais tarde";
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        return errorMessage;
      });
  }

  async function createAcc(email, password) {
    return await createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const credential = result;
        const token = credential.accessToken;
        const user = result.user;
        axios
          .get(process.env.REACT_APP_SERVER + "/user?email=" + user.email)
          .then(function (res) {
            let usr = {
              ...user,
              localData: res.data.results,
              authorized: res.data.results ? true : false
            };
            setUser(usr);
            localStorage.setItem("@AuthFirebase:token", token);
            localStorage.setItem("@AuthFirebase:user", JSON.stringify(usr));
            return "";
          })
          .catch((error) => {
            console.error(error);
            return "Erro interno: confira os dados ou tente mais tarde";
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        return errorMessage;
      });
  }

  async function passwordReset(email) {
    return await sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("E-mail enviado");
        navigate(0);
        return "";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        return errorMessage;
      });
  }

  function signOut() {
    localStorage.removeItem("@AuthFirebase:token");
    localStorage.removeItem("@AuthFirebase:user");
    setUser(null);
    const authUser = Object.keys(window.localStorage).filter((item) =>
      item.startsWith("firebase:authUser")
    )[0];
    localStorage.removeItem(authUser);
    return <Navigate to="/login" />;
  }

  return (
    <AuthGoogleContext.Provider
      value={{
        signed: !!user,
        user,
        signInGoogle,
        signInPassword,
        createAcc,
        passwordReset,
        signOut
      }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};

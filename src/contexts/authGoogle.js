import { useState, createContext, useEffect } from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app, db } from "../services/FirebaseConfig";
import { Navigate } from "react-router-dom";
import axios from "axios";
const provider = new GoogleAuthProvider();

export const AuthGoogleContext = createContext({});

export const AuthGoogleProvider = ({ children }) => {
  const auth = getAuth(app);
  const [user, setUser] = useState(localStorage.getItem("@AuthFirebase:user") !== null ? JSON.parse(localStorage.getItem("@AuthFirebase:user")) : null);

  useEffect(() => {
    const loadStorageData = () => {
      const storageUser = JSON.parse(localStorage.getItem("@AuthFirebase:user"));
      const storageToken = localStorage.getItem("@AuthFirebase:token");
      if (storageToken && storageUser) {
        setUser(storageUser);
      }
    };
    loadStorageData();
    
  },[]);

  

  async function signInGoogle() {
    await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      axios.get(process.env.REACT_APP_SERVER+"/user?email="+user.email)
      .then(function(res){
        if (res.data.results) {
          user.localData = res.data.results
          user.authorized = true
        } else user.authorized = false
        setUser(user);
        localStorage.setItem("@AuthFirebase:token", token);
        localStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
      })
      .catch((error)=>{
        console.error(error)
      })
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }

  function signOut() {
    localStorage.removeItem("@AuthFirebase:token");
    localStorage.removeItem("@AuthFirebase:user");
    setUser(null);
    const authUser = Object.keys(window.localStorage).filter(item => item.startsWith('firebase:authUser'))[0]
    localStorage.removeItem(authUser)
    return <Navigate to="/login" />;
  }

  return (
    <AuthGoogleContext.Provider
      value={{
        signed: !!user,
        user, 
        signInGoogle,
        signOut
      }}
    >
      {children}
    </AuthGoogleContext.Provider>
  );
};
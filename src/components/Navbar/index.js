import { LogOut as ILogOut, User as IUser, UserX as IUserX } from 'react-feather'
import { Link } from 'react-router-dom'
import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import Logo from '../svg/Logo'

function Navbar() {
  const { user, signOut } = useContext(AuthGoogleContext);
  
  return (
    <header className="navbar navbar-dark sticky-top bg-primary container-fluid p-0">
      <div className='d-flex d-sm-none collapsed mx-1'>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
      <Link to="/" className="navbar-brand d-none d-sm-block px-2" style={{height:"2em"}}><Logo dark={true} /></Link>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap d-flex mx-2">
          <div className="feather-props text-light text-end user-select-none py-2">
            <span>{user? user.displayName : "Não autenticado"}</span>
            {user ? <IUser className='user mx-2' /> : <IUserX className='user mx-2' />}
          </div>
          {user && <Link to="login" data-bs-toggle="modal" data-bs-target="#logoutModal" className="nav-link px-2"><ILogOut /></Link>}
        </div>
      </div>
    </header>
  )
}

export default Navbar
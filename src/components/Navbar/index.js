import { LogOut as ILogOut, User as IUser } from 'react-feather'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar navbar-dark sticky-top bg-primary container-fluid p-0">
      <button className="navbar-toggler d-sm-none collapsed mx-1" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <Link to="/" className="navbar-brand d-none d-lg-block           col-2       me-0 px-3 fs-6">Ticket.io</Link>
      <Link to="/" className="navbar-brand d-none d-md-block d-lg-none col-1 col-2 me-0 px-3 fs-6">Ticket</Link>
      <Link to="/" className="navbar-brand d-none d-sm-block d-md-none col-1 col-2 me-0 px-3 fs-6">Tk</Link>
      <div className="navbar-nav">
        <div className="nav-item text-nowrap d-flex">
          <div className="feather-props text-light text-end">
            <IUser className='user mx-2' />
            <span>usuário da silva</span>
          </div>
          <Link to="logout" className="nav-link px-2 mx-2"><ILogOut /></Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
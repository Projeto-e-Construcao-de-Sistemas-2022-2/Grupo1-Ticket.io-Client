import { Home as IHome, Plus as IPlus, List as IList, Sliders as ISliders } from "react-feather"
import { NavLink } from "react-router-dom"
import { useMediaQuery } from 'react-responsive'
import ReactTooltip from 'react-tooltip' 

function Sidebar() {
  const tabletBreakpointMin = useMediaQuery({ query: '(min-width: 992px)' })
  const tabletBreakpointMax = useMediaQuery({ query: '(max-width: 576px)' })
  
  return (
    <nav id="sidebarMenu" className="col-sm-1 col-lg-2 d-sm-block bg-primary sidebar collapse">
      <div className="position-sticky pt-1 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item mx-sm-auto mt-3 mb-1 mx-0 mx-lg-0">
            <NavLink to="/" end className="feather-props nav-link" data-tip="hello world">
              <IHome />
              <span className="px-2 d-sm-inline d-sm-none d-lg-inline">Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item mx-sm-auto my-1 mx-0 mx-lg-0">
            <NavLink to="issues/new" end className="feather-props nav-link" data-tip="hello world">
              <IPlus />
              <span className="px-2 d-sm-inline d-sm-none d-lg-inline">Ticket de problema</span>
            </NavLink>
          </li>
          <li className="nav-item mx-sm-auto my-1 mx-0 mx-lg-0">
            <NavLink to="groups/new" end className="feather-props nav-link" data-tip="hello world">
            <IPlus />
              <span className="px-2 d-sm-inline d-sm-none d-lg-inline">Grupo solucionador</span>
            </NavLink>
          </li>
          <li className="nav-item mx-sm-auto my-1 mx-0 mx-lg-0">
            <NavLink to="issues" end className="feather-props nav-link" data-tip="hello world">
              <IList />
              <span className="px-2 d-sm-inline d-sm-none d-lg-inline">Problemas</span>
            </NavLink>
          </li>
          <li className="nav-item mx-sm-auto my-1 mx-0 mx-lg-0">
            <NavLink to="solutions" end className="feather-props nav-link" data-tip="hello world">
              <IList />
              <span className="px-2 d-sm-inline d-sm-none d-lg-inline">Soluções anteriores</span>
            </NavLink>
          </li>
        </ul>

        <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase"></h6>
        <ul className="nav flex-column mb-2">
          <li className="nav-item mx-sm-auto my-1 mx-0 mx-lg-0">
            <NavLink to="settings" end className="feather-props nav-link" data-tip="hello world">
              <ISliders />
              <span className="px-2 d-sm-inline d-sm-none d-lg-inline">Configurações</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <ReactTooltip place="right" effect="solid" type="info" disable={tabletBreakpointMax || tabletBreakpointMin} />
    </nav>
  )
}

export default Sidebar
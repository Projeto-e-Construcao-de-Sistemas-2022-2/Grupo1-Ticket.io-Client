import { Link } from "react-router-dom"
import { Mail as IMail, Plus as IPlus, List as IList } from "react-feather"
import "./style.css"

function Dashboard() {
  const themeColorException = localStorage.getItem("theme")==="quartz" || localStorage.getItem("theme")==="vapor" || localStorage.getItem("theme")==="minty" || localStorage.getItem("theme")==="pulse"
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      <div className="row btn-row mb-4">
        <Link to="groups/new" className={"btn btn-square mb-2 btn-"+(themeColorException? "outline-secondary" : "outline-primary")}>
          <IPlus style={{}} />
          <p>Cadastrar Grupo Solucionador</p>
        </Link>
        <Link to="issues/new" className={"disabled btn btn-square mb-2 btn-"+(themeColorException? "outline-secondary" : "outline-primary")}>
          <IPlus style={{}} />
          <p>Cadastrar Ticket de Problema</p>
        </Link>
        <Link to="settings" className={"disabled btn btn-square mb-2 btn-"+(themeColorException? "outline-secondary" : "outline-primary")}>
          <IMail style={{}} />
          <p>Relatório Gerencial</p>
        </Link>
        <Link to="groups" className={"btn btn-square mb-2 btn-"+(themeColorException? "outline-secondary" : "outline-primary")}>
          <IList style={{}} />
          <p>Listar Grupos Solucionadores</p>
        </Link>
        <Link to="issues" className={"disabled btn btn-square mb-2 btn-"+(themeColorException? "outline-secondary" : "outline-primary")}>
          <IList style={{}} />
          <p>Listar Problemas</p>
        </Link>
        <Link to="solutions" className={"disabled btn btn-square mb-2 btn-"+(themeColorException? "outline-secondary" : "outline-primary")}>
          <IList style={{}} />
          <p>Listar Soluções Anteriores</p>
        </Link>
      </div>
      <p>~~exibir um gráfico~~</p>
      <p>~~exibir TPs com mais de 30 dias sem atualização das atividades~~</p>
      <a target="_blank" href="https://gitlab.com/jrmsrs/ticket.io-front/tree/dev">Codigo fonte</a>
      
    </>
  )
}

export default Dashboard
import { Link } from "react-router-dom";
import {
  GroupAddTwoTone,
  AssessmentTwoTone,
  PostAddTwoTone,
  AddTaskTwoTone,
  Groups2TwoTone,
  ListAltTwoTone,
  HomeRepairServiceTwoTone
} from "@mui/icons-material";
import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import "./style.css";

function Dashboard() {
  const { user } = useContext(AuthGoogleContext);
  let role = user.localData.role
  const themeColorException =
    localStorage.getItem("theme") === "quartz" ||
    localStorage.getItem("theme") === "vapor" ||
    localStorage.getItem("theme") === "minty" ||
    localStorage.getItem("theme") === "pulse";
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      <div className="row btn-row mb-4">
        {(role==="g") &&
          <Link
            to="groups/new"
            className={
              "btn btn-square mb-2 btn-" +
              (themeColorException ? "outline-secondary" : "outline-primary")
            }
            color="secondary"
          >
            <GroupAddTwoTone />
            <p>Cadastrar Grupo Solucionador</p>
          </Link>
        }
        {(role==="g" || role==="q") && <Link
          to="issues/new"
          className={
            "btn btn-square mb-2 btn-" +
            (themeColorException ? "outline-secondary" : "outline-primary")
          }
        >
          <PostAddTwoTone />
          <p>Cadastrar Ticket de Problema</p>
        </Link>}
        {(role==="g" || role==="d") && <Link
          to="solutions/new"
          className={
            "btn btn-square mb-2 btn-" +
            (themeColorException ? "outline-secondary" : "outline-primary")
          }
        >
          <AddTaskTwoTone />
          <p>Cadastrar Solução de Causa Raiz</p>
        </Link>}
        <Link
          to="settings"
          className={
            "btn btn-square mb-2 btn-" +
            (themeColorException ? "outline-secondary" : "outline-primary")
          }
        >
          <AssessmentTwoTone />
          <p>Relatório Gerencial</p>
        </Link>
        <Link
          to="groups"
          className={
            "btn btn-square mb-2 btn-" +
            (themeColorException ? "outline-secondary" : "outline-primary")
          }
        >
          <Groups2TwoTone />
          <p>Listar Grupos Solucionadores</p>
        </Link>
        <Link
          to="issues"
          className={
            "btn btn-square mb-2 btn-" +
            (themeColorException ? "outline-secondary" : "outline-primary")
          }
        >
          <ListAltTwoTone />
          <p>Listar Problemas</p>
        </Link>
        <Link
          to="solutions"
          className={
            "btn btn-square mb-2 btn-" +
            (themeColorException ? "outline-secondary" : "outline-primary")
          }
        >
          <HomeRepairServiceTwoTone />
          <p>Listar Soluções Anteriores</p>
        </Link>
      </div>
      <p>~~exibir um gráfico~~</p>
      <p>~~exibir TPs com mais de 30 dias sem atualização das atividades~~</p>
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/Projeto-e-Construcao-de-Sistemas-2022-2/Grupo3-Ticket.io-Client"
      >
        Codigo fonte
      </a>
    </>
  );
}

export default Dashboard;

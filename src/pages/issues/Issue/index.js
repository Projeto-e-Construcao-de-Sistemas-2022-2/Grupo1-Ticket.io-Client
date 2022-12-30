import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";

export default function Issue() {
  const { id } = useParams();
  const [tpData, setTpData] = useState([]);
  const [tpGroupName, setTpGroupName] = useState([]);
  const navigate = useNavigate();

  let getData = async () => {
    await axios
      .get(process.env.REACT_APP_SERVER + "/issue/" + id)
      .then(async (tpRes) => {
        if (!tpRes.data.results) return;
        setTpData(tpRes.data.results);
        await axios
          .get(
            process.env.REACT_APP_SERVER +
              "/group/" +
              tpRes.data.results.group_id
          )
          .then((tpGroupRes) => {
            setTpGroupName(
              tpGroupRes.data.results ? tpGroupRes.data.results.name : null
            );
          });
      });
  };

  let removeData = async () => {
    await axios
      .delete(process.env.REACT_APP_SERVER + "/issue/" + id)
      .then(function () {
        navigate("/issues");
      });
  };

  useEffect(() => {
    getData();
  });

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Detalhes do TP </h1>
      </div>
      <h3>Ticket de Problema:</h3>
      <p style={{ marginBottom: "0" }}>
        <strong>{tpData.title}</strong> &lt;{id}&gt;
      </p>
      <pre style={{whiteSpace: "pre-line"}}>{tpData.desc}</pre>
      <h3>Grupo atribuido:</h3>
      {tpGroupName && (
        <>
          <p style={{ marginBottom: "0" }}>
            <Link to={"/groups/" + tpData.group_id}>{tpGroupName}</Link>
          </p>
          <pre style={{whiteSpace: "pre-line"}}>{tpData.dev_contact}</pre>
          
        </>
      )}
      {!tpGroupName && <p>Nenhum</p>}
      <h3>Previsão de Conclusão:</h3>
      <p>
        {new Date(tpData.prev_conclusion).toLocaleDateString("pt-br", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        })}
      </p>
      <h3>Conclusão:</h3>
      <p>
        {tpData.conclusion && (
          <>
            {new Date(tpData.conclusion).toLocaleDateString("pt-br", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric"
            })}
            &nbsp;
            <Link to="">(Causa-Raiz)</Link>
          </>
        )}
      </p>
      {!tpData.conclusion && <p>Em andamento</p>}
      <h3>Data de criação:</h3>
      <p>{new Date(tpData.created_at).toLocaleString()}</p>

      <div className="d-flex flex-column">
        <Link
          to={"/issues/" + tpData.id + "/update"}
          className="m-2 btn btn-primary"
        >
          Modificar TP
        </Link>
        <Link
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#confirm"
          className="m-2 btn btn-danger"
        >
          Excluir TP
        </Link>
      </div>
      <Modal
        id="confirm"
        danger
        body={
          <>
            <p>
              Isso EXCLUIRÁ o problema, para encerrar use a opção
              "MODIFICAR/ENCERRAR PROBLEMA".
            </p>
            <p>Ainda deseja prosseguir com a exclusão?</p>
          </>
        }
        onClick={removeData}
        confirm="Excluir"
      />
    </>
  );
}

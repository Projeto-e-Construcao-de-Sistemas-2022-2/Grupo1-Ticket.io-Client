import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Modal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";

function Group() {
  const { id } = useParams();
  const [groupData, setGroupData] = useState([]);
  const [groupMembers, setGroupMembers] = useState([]);
  const navigate = useNavigate();

  let getData = async () => {
    let groupRes = await axios.get(
      process.env.REACT_APP_SERVER + "/group/" + id
    );
    setGroupData(groupRes.data.results);
    let groupMembersRes = await axios.get(
      process.env.REACT_APP_SERVER + "/group/" + id + "?members=true"
    );
    setGroupMembers(groupMembersRes.data.results);
  };

  let removeData = async () => {
    await axios
      .delete(process.env.REACT_APP_SERVER + "/group/" + id)
      .then(function () {
        navigate("/groups");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Detalhes do Grupo </h1>
      </div>
      <h3>Nome do grupo:</h3>
      <p>{groupData.name}</p>
      <h3>Data de criação:</h3>
      <p>{groupData.created_at}</p>
      <h3>Membros:</h3>
      <div className="mb-4">
        {groupMembers.map((member) => (
          <p key={member.id}>
            {member.name} ({member.email})
          </p>
        ))}
      </div>
      <div className="d-flex flex-column">
        <Link
          to={"/groups/" + groupData.id + "/update"}
          className="m-2 btn btn-primary"
        >
          Modificar grupo
        </Link>
        <Link
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#confirm"
          className="m-2 btn btn-danger"
        >
          Excluir grupo
        </Link>
      </div>
      <Modal
        id="confirm"
        danger
        body="Deseja excluir o grupo?"
        onClick={removeData}
      />
    </>
  );
}

export default Group;

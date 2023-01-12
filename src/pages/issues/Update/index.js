import React, { useContext, useState, useEffect } from "react";
import { AuthGoogleContext } from "../../../contexts/authGoogle";
import axios from "axios";
import Modal from "../../../components/Modal";
import DatePicker, { CalendarContainer } from "react-datepicker";
import Select from "react-select";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, useNavigate, Link } from "react-router-dom";

/* documentação react-datepicker: https://reactdatepicker.com/ */
/* documentação react-hook-form: https://react-hook-form.com/get-started/ */

export default function UpdateIssue() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const [selectDate, setSelectDate] = useState(null);
  const [groupsData, setGroupsData] = useState([]);
  const [groupsOptions, setOptions] = useState([]);
  const [issueData, setIssueData] = useState([]);
  const [select, setSelect] = useState(null);
  const [result, setResult] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthGoogleContext);
  let role = user.localData.role
  //let options = []
  let getData = async () => {
    let promises = [];
    promises.push(axios.get(process.env.REACT_APP_SERVER + "/group"));
    promises.push(axios.get(process.env.REACT_APP_SERVER + "/issue/" + id));
    await Promise.all(promises).then(async (res) => {
      setGroupsData(res[0].data.results);
      setIssueData(res[1].data.results);
      setSelectDate(new Date(res[1].data.results.prev_conclusion));
    });
  };

  useEffect(() => {
    if (groupsData.length <= 0) {
      getData();
    } else {
      groupsData.map((op) => {
        //options.push({value: op.email, label: op.name.first + " " + op.name.last + " {" + op.email + "}"})
        var item = {
          value: op.id,
          label: op.name
        };
        return setOptions((options) => [...options, item]);
      });
    }
  }, [groupsData]);

  const calendarContainer = ({ className, children }) => {
    return (
      <div
        style={{
          width: "100vw",
          padding: "3px",
          textAlign: "center",
          margin: "0 auto"
        }}
      >
        <CalendarContainer className={className}>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  const handleSelect = (e) => {
    setSelect(e);
  };

  const patchData = async (data) => {
    await axios
      .patch(process.env.REACT_APP_SERVER + "/issue/" + id, data)
      .then(function (res) {
        navigate("/issues/" + id);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onSubmit = (e) => {
    if (select) e.group = select.value;
    e.prevConclusion = selectDate;
    let o = Object.fromEntries(Object.entries(e).filter(([_, v]) => v !== ""));
    setResult(
      "PATCH:\n" +
        JSON.stringify(o, null, 2) +
        "\n(redirecionar para página Listar Problemas qnd o backend confirmar)"
    );
    patchData(e);
  };

  if (role!=="q" && role!=="g") return (
    <p className="text-danger pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 ">
      Apenas um Analista de Qualidade ou o Gestor tem permissão para cadastrar, modificar ou excluir um Problema
    </p>
  )
  else return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Atualizar Ticket de Problema</h1>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row d-flex justify-content-center"
      >
        <div className="col-md-6">
          <label htmlFor="title" className="mb-0 col-form-label">
            Título do problema:{" "}
          </label>
          <input
            id="title"
            type="text"
            className="mb-3 form-control"
            defaultValue={issueData.title}
            {...register("title", {
              minLength: {
                value: 6,
                message: "Mínimo de 6 caracteres"
              },
              pattern: {
                value: /^[a-zA-Z0-9 ]+$/i,
                message: "Apenas caracteres alfanuméricos"
              }
            })}
          />
          <p className="text-warning">{errors?.title?.message}</p>
        </div>
        <div className="col-md-6">
          <label htmlFor="react-select-2-input" className="mb-0 col-form-label">
            Grupo atribuído:
          </label>
          <Select
            value={
              select ||
              groupsOptions.filter(
                (option) => option.value === issueData.group_id
              )
            }
            onChange={(e) => {
              handleSelect(e);
            }}
            name="group"
            isLoading={groupsData.length <= 0}
            options={groupsOptions}
            placeholder={
              groupsData.length <= 0 ? "Carregando..." : "Selecionar"
            }
            className="form-text basic-multi-select text-dark mb-3"
            classNamePrefix="select"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="description" className="mb-0 col-form-label">
            Descrição do problema:{" "}
          </label>
          <textarea
            rows={5}
            id="description"
            className="mb-3 form-control"
            defaultValue={issueData.desc}
            {...register("desc")}
          />
          <p className="text-warning">{errors?.desc?.message}</p>
        </div>
        <div className="col-md-6">
          <label htmlFor="developer-contact" className="mb-0 col-form-label">
            Contato do desenvolvedor:{" "}
          </label>
          <textarea
            rows={5}
            id="developer-contact"
            className="mb-3 form-control"
            defaultValue={issueData.dev_contact}
            {...register("devContact")}
          />
          <p className="text-warning">{errors?.devContact?.message}</p>
        </div>
        <div className="col-6">
          <label htmlFor="date" className="mb-0 col-form-label">
            Previsão de conclusão:{" "}
          </label>
          <DatePicker
            id="date"
            calendarContainer={calendarContainer}
            className="form-control"
            dateFormat="dd/MM/yyyy"
            selected={selectDate}
            onChange={(date) => setSelectDate(date)}
          />
        </div>
        <div className="my-4 col-12 d-flex justify-content-center">
          {/* <button type="reset" className="mx-2 px-5 btn btn-warning">
            Limpar
          </button> */}
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#confirm"
            className="mx-3 px-5 btn btn-primary"
          >
            Enviar
          </button>
        </div>
        <pre style={{ visibility: "hidden" }}>{result}</pre>
        <Modal id="confirm" body="Deseja criar TP?" submit />
      </form>
    </>
  );
}

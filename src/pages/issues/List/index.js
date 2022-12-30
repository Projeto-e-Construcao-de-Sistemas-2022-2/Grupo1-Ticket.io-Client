import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

/* documentação axios: https://axios-http.com/ptbr/docs/intro */
/* documentação react-data-table-component: https://react-data-table-component.netlify.app/ */
/* https://www.npmjs.com/package/react-data-table-component-extensions */

export default function Issues() {
  const [data, setData] = useState([]);
  const [pending, setPending] = useState(true);
  const navigate = useNavigate();

  async function getData() {
    let count = 0;
    let arr = [];
    let promises = [];
    await axios
      .all([axios.get(process.env.REACT_APP_SERVER + "/issue")])
      .then(
        axios.spread((res) => {
          res.data.results.forEach((group) => {
            promises.push(
              axios.get(
                process.env.REACT_APP_SERVER +
                  "/group/" +
                  group.id +
                  "?members=true"
              )
            );
          });
          let members = Promise.all(promises);

          res.data.results.forEach((group, i) => {
            members
              .then(function (res) {
                count = 0;
                res[i].data.results.forEach(() => count++);
                group.membercount = count;
              })
              .then(() => setPending(false));
            arr.push(group);
            setData(arr);
          });
        })
      )
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      id: "title",
      name: "Título",
      selector: (row) => row.title,
      sortable: true
    },
    {
      id: "prevConclusion",
      name: "Prev. de Conclusão",
      selector: (row) =>
        new Date(row.prev_conclusion).toLocaleDateString("pt-BR"),
      sortable: true
    },
    {
      id: "conclusion",
      name: "Conclusão",
      selector: (row) =>
        row.conclusion
          ? new Date(row.conclusion).toLocaleDateString("pt-BR")
          : "Não solucionado",
      sortable: true
    },

    {
      id: "created_at",
      name: "Data de criação",
      selector: (row) => new Date(row.created_at).toLocaleString("pt-BR"),
      sortable: true
    }
  ];

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Lista de Tickets de Problema</h1>
      </div>
      <div
        className={
          localStorage.getItem("dark") === "true"
            ? "table-responsive-dark"
            : "table-responsive-light"
        }
      >
        <DataTableExtensions {...{ columns, data }}>
          <DataTable
            columns={columns}
            data={data}
            theme={localStorage.getItem("dark") === "true" ? "dark" : "light"}
            keyField={"email"}
            onRowClicked={(data) => {
              return navigate("/issues/" + data.id);
            }}
            pointerOnHover
            pagination
            defaultSortFieldId={1}
            highlightOnHover
            progressPending={pending}
            progressComponent=<CircularProgress
              color="inherit"
              style={{ margin: "3em 0" }}
            />
          />
        </DataTableExtensions>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import DataTableExtensions from "react-data-table-component-extensions"
import 'react-data-table-component-extensions/dist/index.css'
import axios from 'axios';
import './styles.css'
import { useNavigate } from 'react-router-dom';

/* documentação axios: https://axios-http.com/ptbr/docs/intro */
/* documentação react-data-table-component: https://react-data-table-component.netlify.app/ */
/* https://www.npmjs.com/package/react-data-table-component-extensions */

function Issues() {
  const [data, setData] = useState([])
  const [pending, setPending] = useState([])
  const navigate = useNavigate();

  let getData = async () => {
    let res = await axios.get('https://randomuser.me/api/?results=50&seed=SEMENTE&nat=gb,us,br')
    setData(res.data.results)
    setPending(false)
  }

  useEffect(()=>{
    getData()
  }, [])

  const columns = [
    {
      id: 'firstname',
      name: 'Name',
      selector: row => row.name.first,
      sortable: true,
    },
    {
      id: 'lastname',
      name: 'Last name',
      selector: row => row.name.last,
      sortable: true,
    },
    {
      id: 'gender',
      name: 'Gender',
      selector: row => row.gender,
      sortable: true,
    },
    {
      id: 'country',
      name: 'Country',
      selector: row => row.location.country,
      sortable: true,
    },
    {
      id: 'state',
      name: 'State',
      selector: row => row.location.state,
      sortable: true,
    },
    {
      id: 'borndate',
      name: 'Born date',
      selector: row => row.dob.date,
      sortable: true,
    },
    {
      id: 'email',
      name: 'E-mail',
      selector: row => row.email,
      sortable: true,
    }
  ];
  
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Lista de problemas</h1>
      </div>
      <div className="table-responsive">
        <DataTableExtensions {...{columns,data}}>
          {localStorage.getItem("dark")!=="true" ? <DataTable
            columns={columns}
            data={data}
            keyField={'email'}
            onRowClicked={data => {
              return navigate("/issues/"+data.login.uuid)
            }}
            pointerOnHover
            pagination
            defaultSortFieldId={1}
            highlightOnHover
            progressPending={pending}
          /> :
          <DataTable
            columns={columns}
            data={data}
            theme="dark"
            keyField={'email'}
            onRowClicked={data => {
              return navigate("/issues/"+data.login.uuid)
            }}
            pointerOnHover
            pagination
            defaultSortFieldId={1}
            highlightOnHover
            progressPending={pending}
          />}
        </DataTableExtensions>
      </div>
      <p>api: https://randomuser.me/api/?results=50&seed=SEMENTE&nat=gb,us,br</p>
    </>
  )
}

export default Issues
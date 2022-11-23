import Select from 'react-select'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Modal from '../../../components/Modal'
/* documentação: https://react-select.com/ */

function NewIssue() {
  const [data, setData] = useState([])
  let options = []
  let getData = async () => {
    let res = await axios.get('https://randomuser.me/api/?results=50')
    setData(res.data.results)
  }

  useEffect(()=>{
    if (data.length === 0) {
      getData()
    } else {
      data.map(function(op){
        options.push({value: op.email, label: op.name.first + " " + op.name.last + " {" + op.email + "}"})
      })
    }
  }, [data])

  return (
    <>
      <div className="justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Novo grupo solucionador</h1>
      </div>
      <div>
        <label htmlFor="name" className="mb-0 col-form-label">Nome do grupo: </label>
        <input id="name" type="text" className="mb-3 form-control" />
        <label htmlFor="react-select-2-input" className="mb-0 col-form-label">Membros: </label>
        <Select
          defaultValue={[]}
          isMulti
          name="members"
          isLoading = {data.length<=0}
          placeholder = {data.length<=0 ? "Carregando..." : "Selecionar"}
          options={options}
          className="form-text basic-multi-select text-dark"
          classNamePrefix="select"
        />
        <div className="my-4 col-12 d-flex justify-content-center">
          <button className="mx-2 px-5 btn btn-warning">Limpar</button>
          <button data-bs-toggle="modal" data-bs-target="#confirm" className="mx-3 px-5 btn btn-primary">Enviar</button>
        </div>
      </div>
      <Modal 
        id="confirm"
        body="Deseja criar o grupo?"  
      />
    </>
  )
}

export default NewIssue
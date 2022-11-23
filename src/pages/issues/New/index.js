import React, { useState, useEffect } from "react"
import axios from "axios"
import Modal from '../../../components/Modal'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import Select from 'react-select'
import "react-datepicker/dist/react-datepicker.css"

function NewIssue() {
  const [selectDate, setSelectDate] = useState(new Date());
  const [groupsData, setGroupsData] = useState([])
  let options = []
  let getGroupsData = async () => {
    let res = await axios.get('https://randomuser.me/api/?results=50')
    setGroupsData(res.data.results)
  }

  useEffect(()=>{
    if (groupsData.length === 0) {
      getGroupsData()
    } else {
      groupsData.map(function(op){
        options.push({value: op.email, label: op.name.first + " " + op.name.last + " {" + op.email + "}"})
      })
    }
    console.log(selectDate.toJSON())
  },[selectDate, groupsData])
  
  const calendarContainer = ({ className, children }) => {
    return (
      <div style={{ width: '100vw', padding: "3px", textAlign: 'center', margin: "0 auto"}}>
        <CalendarContainer className={className}>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Criar Ticket de Problema</h1>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="col-md-6">
          <label htmlFor="title" className="mb-0 col-form-label">Título do problema: </label>
          <input id="title" type="text" className="mb-3 form-control" />
        </div>
        <div className="col-md-6">
          <label htmlFor="react-select-2-input" className="mb-0 col-form-label">Grupo atribuído: </label>
          <Select
            id="group"
            defaultValue={[]}
            isLoading={groupsData.length <= 0}
            name="members"
            options={options}
            placeholder={groupsData.length <= 0 ? "Carregando..." : "Selecionar"}
            className="form-text basic-multi-select text-dark mb-3"
            classNamePrefix="select"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="description" className="mb-0 col-form-label">Descrição do problema: </label>
          <textarea rows={5} id="description" className="mb-3 form-control" />
        </div>
        <div className="col-md-6">
          <label htmlFor="developer-contact" className="mb-0 col-form-label">Contato do desenvolvedor: </label>
          <textarea rows={5} id="developer-contact" className="mb-3 form-control" />
        </div>
        <div className="col-6">
          <label htmlFor="date" className="mb-0 col-form-label">Previsão de conclusão: </label>
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
          <button className="mx-2 px-5 btn btn-warning">Limpar</button>
          <button data-bs-toggle="modal" data-bs-target="#confirm" className="mx-3 px-5 btn btn-primary">Enviar</button>
        </div>
      </div>
      <Modal 
        id="confirm"
        body="Deseja criar TP?"  
      />
    </>
  )
}

export default NewIssue
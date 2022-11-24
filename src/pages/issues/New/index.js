import React, { useState, useEffect } from "react"
import axios from "axios"
import Modal from '../../../components/Modal'
import DatePicker, { CalendarContainer } from 'react-datepicker'
import Select from 'react-select'
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css"

/* documentação react-datepicker: https://reactdatepicker.com/ */
/* documentação react-hook-form: https://react-hook-form.com/get-started/ */

function NewIssue() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [selectDate, setSelectDate] = useState(new Date());
  const [groupsData, setGroupsData] = useState([])
  const [groupsOptions, setOptions] = useState([])
  const [select, setSelect] = useState(null)
  const [emptySelect, setEmptySelect] = useState(true)
  const [result, setResult] = useState("")
  //let options = []
  let getGroupsData = async () => {
    let res = await axios.get('https://randomuser.me/api/?results=50')
    setGroupsData(res.data.results)
  }

  useEffect(()=>{
    if (groupsData.length <= 0) {
      getGroupsData()
    } else {
      groupsData.map(function(op){
        //options.push({value: op.email, label: op.name.first + " " + op.name.last + " {" + op.email + "}"})
        var item = {value: op.email, label: op.name.first + " " + op.name.last + " {" + op.email + "}"}
        setOptions(options => [...options, item])
      })
    }
  },[groupsData])
  
  const calendarContainer = ({ className, children }) => {
    return (
      <div style={{ width: '100vw', padding: "3px", textAlign: 'center', margin: "0 auto"}}>
        <CalendarContainer className={className}>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    )
  }

  const handleSelect = (e) => {
    setSelect(e)
    setEmptySelect(false)
  }

  const onSubmit = (e) => {
    e.group_id = select.value
    e.prev_conclusion = selectDate
    setResult("POST:\n" + JSON.stringify(e, null, 2) + 
    "\n(redirecionar para página Listar Problemas qnd o backend confirmar)")
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Criar Ticket de Problema</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="row d-flex justify-content-center">
        <div className="col-md-6">
          <label htmlFor="title" className="mb-0 col-form-label">Título do problema: </label>
          <input 
            id="title" type="text" className="mb-3 form-control" 
            {...register(
              "title", {
                required: "Campo obrigatório", 
                minLength: {
                  value: 6,
                  message: "Mínimo de 6 caracteres"
                }, 
                pattern: {
                  value: /^[a-zA-Z0-9 ]+$/i,
                  message: "Apenas caracteres alfanuméricos"
                } 
              }
            )}
          />
          <p className='text-warning'>{errors?.title?.message}</p>
        </div>
        <div className="col-md-6">
          <label htmlFor="react-select-2-input" className="mb-0 col-form-label">Grupo atribuído: </label>
          <Select
            value={select}
            onChange={(e) => {handleSelect(e)}}
            defaultValue={[]}
            name="group"
            isLoading={groupsData.length <= 0}
            options={groupsOptions}
            placeholder={groupsData.length <= 0 ? "Carregando..." : "Selecionar"}
            className="form-text basic-multi-select text-dark mb-3"
            classNamePrefix="select"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="description" className="mb-0 col-form-label">Descrição do problema: </label>
          <textarea 
            rows={5} id="description" className="mb-3 form-control" 
            {...register("description", { required: "Campo obrigatório" })}  
          />
          <p className='text-warning'>{errors?.description?.message}</p>
        </div>
        <div className="col-md-6">
          <label htmlFor="developer-contact" className="mb-0 col-form-label">Contato do desenvolvedor: </label>
          <textarea 
            rows={5} id="developer-contact" className="mb-3 form-control" 
            {...register("dev_contact", { required: "Campo obrigatório" })}  
          />
          <p className='text-warning'>{errors?.dev_contact?.message}</p>
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
          <button type="reset" className="mx-2 px-5 btn btn-warning">Limpar</button>
          <button type="button" data-bs-toggle="modal" data-bs-target="#confirm" className="mx-3 px-5 btn btn-primary" disabled={emptySelect}>Enviar</button>
        </div>
        <pre>{result}</pre>
        <Modal 
          id="confirm"
          body="Deseja criar TP?"
          submit
        />
      </form>
    </>
  )
}

export default NewIssue
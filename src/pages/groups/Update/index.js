import Select from 'react-select'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Modal from '../../../components/Modal'
import { useForm } from "react-hook-form";
import { useParams, useNavigate, Link } from 'react-router-dom'

/* documentação react-select: https://react-select.com/ */
/* documentação react-hook-form: https://react-hook-form.com/get-started/ */

function UpdateGroup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [data, setData] = useState([])
  const [options, setOptions] = useState([])
  const [select, setSelect] = useState(null)
  const [emptySelect, setEmptySelect] = useState(true)
  const [result, setResult] = useState("")
  const [groupData, setGroupData] = useState([])
  const [groupMembers, setGroupMembers] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()
  let getData = async () => {
    let promises = []
    promises.push(axios.get(process.env.REACT_APP_SERVER+'/group/'+id))
    promises.push(axios.get(process.env.REACT_APP_SERVER+'/group/'+id+'?members=true'))
    promises.push(axios.get(process.env.REACT_APP_SERVER+'/user'))

    await Promise.all(promises).then((res)=>{
      setGroupData(res[0].data.results)
      res[1].data.results.map(function(op){
        setGroupMembers(groupMembers => [...groupMembers, {value: op.id, label: op.name + " {" + op.email + "}"}])
      })
      setData(res[2].data.results)
    })

    
  }
  let patchData = async (data) => {
    await axios.patch(process.env.REACT_APP_SERVER+'/group/'+id, data)
    .then(function(res){
      navigate("/groups/"+id)
    })
    .catch(function(error){
      console.log(error)
    })
  }

  useEffect(()=>{
    if (data.length <= 0) {
      getData()
    } else {
      data.map(function(op){
        var item = {value: op.id, label: op.name + " {" + op.email + "}"}
        setOptions(options => [...options, item])
      })
    }
  }, [data])

  const handleSelect = (e) => {
    setGroupMembers(e)
    setEmptySelect(e.length <= 0)
  }

  const onSubmit = (e) => {
    const selectArr = []
    groupMembers.map((i)=> selectArr.push(i.value))
    e.users = selectArr
    patchData(e)
  }

  return (
    <>
      <div className="justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Atualizar grupo solucionador</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name" className="mb-0 col-form-label">Nome do grupo: </label>
        <input 
          id="name" name="name" type="text" className="mb-3 form-control" defaultValue={groupData.name}
          {...register("name", {
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
        <p className='text-warning'>{errors?.name?.message}</p>

        <label htmlFor="react-select-2-input" className="mb-0 col-form-label">Membros: </label>
        <Select
          isMulti
          value={groupMembers}
          onChange={(e) => {handleSelect(e)}}
          defaultValue={[groupMembers]}
          name="users"
          isLoading = {data.length<=0}
          options={options}
          placeholder = {data.length<=0 ? "Carregando..." : "Selecionar"}
          className="form-text basic-multi-select text-dark"
          classNamePrefix="select"
        />
        <div className="my-4 col-12 d-flex justify-content-center">
          <button type="reset" className="mx-2 px-5 btn btn-warning">Limpar</button>
          <button type="button" data-bs-toggle="modal" data-bs-target="#confirm" className="mx-3 px-5 btn btn-primary" disabled={emptySelect}>Enviar</button>
        </div>
        <Modal
          id="confirm"
          body="Deseja alterar o grupo?"
          submit
        />
      </form>
      
    </>
  )
}

export default UpdateGroup
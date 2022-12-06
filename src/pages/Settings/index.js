import { useContext, useState, useEffect } from 'react'
import { AuthGoogleContext } from "../../contexts/authGoogle"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import Modal from '../../components/Modal'
import axios from 'axios'

function Settings() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { user, signed, signOut } = useContext(AuthGoogleContext)
  const [data, setData] = useState([])
  const [id, setId] = useState()
  const navigate = useNavigate()
  
  useEffect(()=>{
    getData()
  }, [])

  if (!signed || !user)
    return <Navigate to="/login" />

  let getData = async () => {
    let res = await axios.get(process.env.REACT_APP_SERVER+'/user?email='+user.email)
    setData(res.data.results)
  }
  
  let patchData = async (_data) => {
    await axios.patch(process.env.REACT_APP_SERVER+'/user/'+data.id, _data)
    .then(function(res){
      navigate(0)
    })
  }

  const onSubmit = (e) => {
    let o = Object.entries(e).reduce((acc, [k, v]) => v ? {...acc, [k]:v} : acc , {})
    if (Object.keys(o).length === 0 && o.constructor === Object)
      return
    patchData(o)
  }

  let removeData = async () => {
    await axios.delete(process.env.REACT_APP_SERVER+'/user/'+data.id)
    .then(function(){
      signOut()
    })
  }

  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Configurações</h1>
      </div>
    
      <form onSubmit={handleSubmit(onSubmit)}>
        
          <p className="mt-3 mb-2 text-center fs-3 text-uppercase user-select-none">Alterar Cadastro</p>
          <label htmlFor="name" className="fs-6">Nome completo</label>
          <input type="text" readOnly name="name" id="name" className="form-control bg-dark text-light mb-3" value={user.displayName} />
          <label htmlFor="email" className="fs-6">E-mail</label>
          <input type="email" readOnly name="email" id="email" className="form-control bg-dark text-light mb-3" value={user.email} />
          <label htmlFor="cpf" className="fs-6">CPF</label>
          <input type="number" name="cpf" id="cpf" className="form-control mb-3" defaultValue={data.cpf} {...register("cpf", {            
            minLength: {
              value: 11,
              message: "11 digitos!"
            }, 
            maxLength: {
              value: 11,
              message: "11 digitos!"
            },
            pattern: {
              value: /^[0-9]+$/i,
              message: "Apenas caracteres numéricos"
            } 
            })} />
          <label htmlFor="cep" className="fs-6">CEP</label>
          <input type="number" name="cep" id="cep" className="form-control mb-3" defaultValue={data.cep} {...register("cep", {
            minLength: {
              value: 8,
              message: "8 digitos!"
            }, 
            maxLength: {
              value: 8,
              message: "8 digitos!"
            }, 
            pattern: {
              value: /^[0-9]+$/i,
              message: "Apenas caracteres numéricos"
            } 
            })} />
          
          <div className="w-100 d-flex flex-column">
            <button type="submit" className="w-50 mx-auto my-3 btn btn-primary">Confirmar alterações</button>
            <Link to={null} data-bs-toggle="modal" data-bs-target="#confirm" className="link-danger m-auto">Excluir cadastro (irreversível)</Link>
          </div>
        <Modal
          id="confirm"
          title="Excluir cadastro"
          body={<>{"Tem certeza que deseja excluir o seu cadastro?"}<br />{"Irá remover seu nome de todos os grupos associados. "}</>}
          danger
          onClick={removeData}
        />
      </form>
      
      
    </>
  )
  
};

export default Settings;
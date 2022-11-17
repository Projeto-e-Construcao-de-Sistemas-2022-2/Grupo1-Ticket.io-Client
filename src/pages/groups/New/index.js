import Select from 'react-select'
import axios from 'axios'
import { useState, useEffect } from 'react'
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
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Novo grupo solucionador</h1>
      </div>
      <p>Membros: </p>
      <Select
        defaultValue={[]}
        isMulti
        name="members"
        options={options}
        className="form-text basic-multi-select text-dark"
        classNamePrefix="select"
      />
    </>
  )
}

export default NewIssue
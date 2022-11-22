import { useEffect, useState } from "react"
import axios from "axios"

function Dashboard() {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      <p>~~exibir um gráfico~~</p>
      <p>~~exibir TPs com mais de 30 dias sem atualização das atividades~~</p>
      <p>+Grupo solucionador (apenas pra quem é do time de gestores ?)</p>
      <p>+Ticket (pra quem é do time qualidade)</p>
      <p>Lista grupos solucionadores</p>
      <p>Lista problemas</p>
      <p>Lista soluções</p>
      <p>Relatório de envios</p>
      <a target="_blank" href="https://gitlab.com/jrmsrs/ticket.io-front/tree/dev">Codigo fonte</a>
      
    </>
  )
}

export default Dashboard
function Dashboard() {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>
      <canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>
      <p>exibir algum gráfico ?</p>
      <p>+Ticket (pra quem é do time qualidade)</p>
      <p>+Grupo solucionador (apenas pra quem é do time de gestores ?)</p>
      <p>Lista problemas</p>
      <p>Lista soluções</p>
      <p>+Ticket</p>
      <p>exibir TPs com mais de 30 dias sem atualização das atividades</p>
      
    </>
  )
}

export default Dashboard
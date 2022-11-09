import './styles.css'

function Issues() {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pt-md-4 pt-xl-5 pb-2 mb-3 border-bottom">
        <h1 className="h2">Lista de problemas</h1>
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Ticket nº</th>
              <th scope="col">Grupo atribuído</th>
              <th scope="col">Encerrado</th>
              <th scope="col">Prev. de conclusão</th>
              <th scope="col">Data de conclusão</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><a className="link" href="#">1,001</a></td>
              <td>XXXX XXXX</td>
              <td>encerrado</td>
              <td>2022-11-08</td>
              <td>2022-11-08</td>
            </tr>
            <tr>
              <td><a className="link" href="#">1,002</a></td>
              <td>XXXX XXXX</td>
              <td>em aberto</td>
              <td>2022-11-08</td>
              <td>---</td>
            </tr>
            <tr>
              <td><a className="link" href="#">1,003</a></td>
              <td>YYYY YYYY</td>
              <td>em aberto</td>
              <td>2022-11-08</td>
              <td>---</td>
            </tr>
            <tr>
              <td><a className="link" href="#">1,004</a></td>
              <td>XXXX XXXX</td>
              <td>em aberto</td>
              <td>2022-11-08</td>
              <td>---</td>
            </tr>
            <tr>
              <td><a className="link" href="#">1,005</a></td>
              <td>ZZZZ ZZZZ</td>
              <td>em aberto</td>
              <td>2022-11-08</td>
              <td>---</td>
            </tr>
            <tr>
              <td><a className="link" href="#">1,006</a></td>
              <td>YYYY YYYY</td>
              <td>em aberto</td>
              <td>2022-11-08</td>
              <td>---</td>
            </tr>
            <tr>
              <td><a className="link" href="#">1,007</a></td>
              <td>YYYY YYYY</td>
              <td>em aberto</td>
              <td>2022-11-08</td>
              <td>---</td>
            </tr>
            <tr>
              <td><a className="link" href="#">1,008</a></td>
              <td>WWW WWW</td>
              <td>encerrado</td>
              <td>2022-11-08</td>
              <td>2022-11-08</td>
            </tr>
            <tr>
              <td><a className="link" href="#">1,009</a></td>
              <td>XXXX XXXX</td>
              <td>em aberto</td>
              <td>2022-11-08</td>
              <td>---</td>
            </tr>
            <tr>
              <td><a className="link" href="#">1,010</a></td>
              <td>ZZZZ ZZZZ</td>
              <td>em aberto</td>
              <td>2022-11-08</td>
              <td>---</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Issues
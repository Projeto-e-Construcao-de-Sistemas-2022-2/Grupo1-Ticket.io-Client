import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
function MainContainer({ children }){
  const { signOut } = useContext(AuthGoogleContext);
  return(
    <>
    <div className='container-fluid'>
      <div className="row">
        <main className="container-custom col-sm-11 ms-sm-auto col-lg-10 px-sm-4">
          {children}
        </main>
      </div>
    </div>
    {/* esconder isso kkk */}
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Encerrar sessão</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Tem certeza que deseja encerrar sessão?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Voltar</button>
              <button type="button" onClick={() => signOut()} data-bs-dismiss="modal" class="btn btn-primary">Encerrar sessão</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MainContainer
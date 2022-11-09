function MainContainer({ children }){
  return(
    <div className='container-fluid'>
      <div className="row">
        <main className="container-custom col-sm-11 ms-sm-auto col-lg-10 px-sm-4">
          {children}
        </main>
      </div>
    </div>
  )
}

export default MainContainer
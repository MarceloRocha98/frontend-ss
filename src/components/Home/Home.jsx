import React, { Component } from 'react'
import { useHistory, Link } from 'react-router-dom'
import api from '../../services/api'
import './Home.css'
import { userKey } from '../Signin/Signin'
import Nav from '../templates/Nav'
import { inArray } from 'jquery'
import {Dropdown} from 'react-bootstrap'
// import Footer from '../templates/Footer'

export default class Home extends Component {
  state = {
    services: [],
    count: 0,
    page: 1, //page q to
    prevPage: 1,
    arrayPages: [],
    loading: true,
    search: '',
    searchLocat:"",
    allservices: [],
    searchName: 1,
    searchLocation:0,
   
  }

  async componentDidMount() { // chama dps q o comoponente é feito. 
    const userData = JSON.parse(localStorage.getItem(userKey))


    console.log(this.props)
      
    if (!userData) {

   //   history.push('/Signin')
    }

  const res = await api.post('validateToken', userData) 
    .then(resp => {
      console.log(resp.data)
      if (!resp.data) { 
       
     //   history.push('/Signin')
        localStorage.removeItem(userKey)
        alert('Sua sessão expirou, entre novamente para continuar')
        this.props.history.push('/Signin')
        
      } 
      if (resp.data) {
        console.log(userData.token)
        const token = (userData.token)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        
      }
      // this.setState({loading:false}) 
       
    }) 

    const { page } = this.state
    //console.log(userData.id)
    const response = await api.get(`services?page=${page}?`) 
    console.log(response.data)
    const limit=response.data.limit
    //  const response = await api.get(`services/:${page}?`)
 //   console.log(response.data.data)
    const dados = response.data.data 
    const count=response.data.count
    let services = dados.filter(service => {
      return service.status===0
    })
    services = services.filter(service => {
      return service.userId !==userData.id
    })
   
    await api.get(`services?limit=${response.data.count}`)
      .then(res => {
        //console.log(res.data.data)
        let allservices = res.data.data 
        allservices = allservices.filter(e => {
          return e.status ===0 && e.userId !== userData.id
        })
        this.setState({allservices})
      })
      
    
    
    let test=[]
    let servicesTest = services.filter(async function(service){
        const serviceId = service.id 
        let k=false
      
     
         await api.get(`handleService?serviceId=${serviceId}`)
          .then(res => {
            let ids = []
            k=false
            console.log(res.data.data)
            let resData = res.data.data
            resData = resData.forEach(function(e) {
              ids.push(e.user_Id)
             // console.log(typeof(e.user_Id))
            })
            console.log(ids)
          //  console.log(typeof(userData.id))
            
            //console.log(inArray(userData.id, ids))
            if (inArray(userData.id, ids) === -1) {
              console.log(service)
              test.push(service)
      
              k=true
            } else {
              k = false
            
            }
            
            
           // if(userData.id)
          })
      console.log(k)
      return k
      
    })
    let promise = new Promise(function (resolve, reject) {
      // the function is executed automatically when the promise is constructed

      // after 1 second signal that the job is done with the result "done"
      setTimeout(() => resolve("done"), 1000);
  });
  Promise.all([servicesTest, promise]).then((e) => {  // pra resolver o problema do tempo
    console.log(services)
    this.setState({ services:test})    
    this.setState({ loading:false})    
    console.log(test)
  })
    
   ///////////////
   
  ////////////////


    


    localStorage.setItem('count',count)

    this.setState({ count: count })
    // const totalPages = Math.ceil(count / limit)
    const allservices = this.state.allservices 
    console.log(allservices.length)
    console.log(limit)
    console.log(count)
  
    // const totalPages = Math.ceil(allservices.length / limit)
    const totalPages = Math.ceil(count / limit)
    
    let comp = this.state.services
  
    //console.log(totalPages)


    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
       console.log(pages)
    this.setState({ arrayPages: pages })

    
    


  }

  async componentDidUpdate() { // vai ser chamado qnd o estado for mudado
    const { page, prevPage } = this.state
    const userData = JSON.parse(localStorage.getItem(userKey))

    
    if (!(page === prevPage)) {

      const response = await api.get(`services?page=${page}`)
      //console.log(response.data.count)
      //  const response = await api.get(`services/:${page}?`)
      //  console.log('entrei')
      const dados = response.data.data 
      let services = dados.filter(service => {
        return service.status===0
      })
      services = services.filter(service => {
        return service.userId !==userData.id
      })
      console.log(services)

          
    let test=[]
    let servicesTest = services.filter(async function(service){
        const serviceId = service.id 
        let k=false
      
     
         await api.get(`handleService?serviceId=${serviceId}`)
          .then(res => {
            let ids = []
            k=false
            console.log(res.data.data)
            let resData = res.data.data
            resData = resData.forEach(function(e) {
              ids.push(e.user_Id)
             // console.log(typeof(e.user_Id))
            })
            console.log(ids)
          //  console.log(typeof(userData.id))
            
            //console.log(inArray(userData.id, ids))
            if (inArray(userData.id, ids) === -1) {
              console.log(service)
              test.push(service)
      
              k=true
            } else {
              k = false
            
            }
            
            
           // if(userData.id)
          })
      console.log(k)
      return k
      
    })
    let promise = new Promise(function (resolve, reject) {
      // the function is executed automatically when the promise is constructed

      // after 1 second signal that the job is done with the result "done"
      setTimeout(() => resolve("done"), 100);
  });
  Promise.all([servicesTest, promise]).then((e) => {  // pra resolver o problema do tempo
  //  console.log(services)
  this.setState({ services:test})    
  this.setState({ loading:false})    
    console.log(test)
  })
   //   this.setState({ services:services})

      this.setState({ prevPage: page })

      ///////////////
  
      
      return
    }

    

    
  }


  render() {
    const { services } = this.state;

    const { count } = this.state
    const { page } = this.state
    let { arrayPages } = this.state
    const { loading } = this.state
    let { search,searchName,searchLocation, searchLocat} = this.state
    const { limit } = this.state

    const {allservices } =this.state
    
    console.log(services)


 
     


   // console.log(!!search)
    
    
    let filteredServices=[]
    if (!!search) {
      if (searchLocation === 1) {
        filteredServices = services.filter(e => {
        //  alert('Entro')
          let condition = e.location.toLowerCase().indexOf(search.toLowerCase())
          return condition !=-1
        })
      }
      if (searchName === 1) {
        filteredServices = services.filter(e => {
          let condition = e.name.toLowerCase().indexOf(search.toLowerCase())
          return condition !=-1
        })
      }
    } else {
      filteredServices=allservices
    

      
  
    }
    



    // let filteredServices = services.filter(e => {
    //   let condition = e.name.toLowerCase().indexOf(search.toLowerCase())
    //   return condition !=-1
    // })
   // console.log(filteredServices)

    
    if (loading) {
      return (
        <div className='m-3 p-3 d-flex flex-column'>


        <h1 className='text-center font-weight-bold'>Carregando
        </h1>
          <h5 className='text-center font-weight-bold'>Um momento, estamos preparando tudo para você</h5>
          <p className='text-muted text-center'> Caso esteja nessa página a muito tempo tente atualiza-la</p>
          <i class="fa fa-spinner fa-spin fa-3x fa-fw align-self-center m-3" style={{fontSize:'300px'}}></i>
          <span class="sr-only">Loading...</span>

        </div>

      )
    }
 
    return (
     

      
      <div className='d-flex align-content-end flex-wrap justify-content-around mt-5 pt-5'>

      <Nav />
      
        <h2 className='text-center mt-5 pt-4'><i class="fa fa-globe" aria-hidden="true"></i> Serviços</h2>
      
        
    

        <div className="services-contet row">
          <div className='m-3'>
            <h1 className='text-center badge badge-warning text-wrap m-2'>Serviços</h1>
            <div className='d-flex flex-row m-2'>
           
            <Dropdown>
  <Dropdown.Toggle variant="info" id="dropdown-basic">
  <i class="fa fa-search mt-2" aria-hidden="true"></i>
  </Dropdown.Toggle>

  <Dropdown.Menu>
                  <Dropdown.Item onClick={e => {
                  this.setState({searchName:1})
                  this.setState({searchLocation:0})
                    
    }}>Filtrar por nome</Dropdown.Item>
                  <Dropdown.Item onClick={e => {
                    this.setState({searchName:0})
                    this.setState({searchLocation:1})
    }}>Filtrar por local</Dropdown.Item>
    
  </Dropdown.Menu>
</Dropdown>

              

<input
              
              type='text'
              className='form-control'
              placeholder='Search'
              value={search}
              onChange={e => {
                this.setState({ search: e.target.value })
  
                // console.log(search)
                // console.log(services)
              }}
              
              />

              
          
              </div>
          </div>


          <div className="area d-flex flex-column">


            <nav aria-label="Page navigation example" className='m-3'>
              <ul className="pagination justify-content-end">

                <li className="page-item cursor">
                  <a className="page-link"
                    onClick={e => {
                      const prevPage = this.state.page
                      this.setState({ page: prevPage - 1 })
                      this.setState({ prevPage })
                    }}
                    tabindex="-1" aria-disabled="true">Anterior</a>
                </li>

                {
                  arrayPages.map(page => (
                    // <li key={page}>
                    //   <button onClick={e => {
                      //     const prevPage=this.state.page
                      //     this.setState({prevPage})
                    //     this.setState({ page: page })
                    
                    //   }}> {page}</button>
                    // </li>
                    <li className="page-item cursor"
                    onClick={e => {
                      const prevPage = this.state.page
                        this.setState({ prevPage })
                        this.setState({ page })
                        
                      }}
                      ><a className="page-link">{page}</a></li> 
                      ))
                    }

                <li className="page-item cursor">
                  <a className="page-link"
                    onClick={e => {
                      const prevPage = this.state.page
                      this.setState({ page: prevPage + 1 })
                      this.setState({ prevPage })
                    }}
                    >Próxima</a>
                </li>

              </ul>
            </nav>





            <div className="row ml-4">

              {filteredServices.map(e => (
                
                <div class="card text-white bg-info mb-3 mt-4 ml-2 mr-2" style={{ width: "18rem" }}>
                  <div class="card-header text-center">
                  <p>{e.name}</p>
                  <p>Local: {e.location}</p>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">{e.description}</h5>
                    {/* <p class="card-text">{e.content}</p> */}
                    <p className="card-text badge badge-warning text-wrap " style={{width:"6rem"}}> Valor : {e.price}R$</p>
                  </div>
                  <Link to='/ServicePage'>
                  <button type="button"
                    className="btn btn-dark"
                    style={{width:'100%'}}
                    onClick={() => {
                      localStorage.setItem('serviceId',e.id)
                    }}
                    >Ver mais</button>
                    </Link>
                </div>

              ))}
            </div>
          </div>
          

         
        </div>

     

   
      </div>
    )
  }


}
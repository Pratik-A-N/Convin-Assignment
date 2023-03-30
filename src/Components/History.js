import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function History() {
    const [histList, sethistList] = useState(null)
    useEffect(() => {
        fetch("http://localhost:8000/history")
        .then(res =>{
          return res.json()
        })
        .then(data =>{
          sethistList(data);
        })
    }, [])
    
  return (
    <div>
         

      <div className='fluid-container '>
        <div className="row">
          <div className="col-lg-2 side-nav">
            {/* <button type="button" class="btn btn-primary">New Card</button> */}
            <Link to="/" className='histbt' >Home</Link>
            
            <Link to="/history" className='histbt' >History</Link>
          </div>
          <div className="col-lg-10">
            {histList && histList.slice(0).reverse().map((history)=>{
                return <>
                <div className="card" >
                      <div className="card-body">
                        <h4 className="card-title">Name : {history.name}</h4>
                        <h5 className="card-subtitle mb-2 text-muted">Link : <a href={history.link}>{history.link}</a></h5>
                        <h5 className="card-subtitle mb-2 text-muted">Time : {history.time}</h5>
                      </div>
                  </div>
                </>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

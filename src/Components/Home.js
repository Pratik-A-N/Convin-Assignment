import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import BucketComponent from './BucketComponent'
import CardDisplay from './CardDisplay'
import CreateCard from './CreateCard'

export default function Home() {
  const [currentBucket, setcurrentBucket] = useState("Select A Bucket")
  return (
    <div className='fluid-container '>
      <div className="row">
        <div className="col-lg-2 side-nav">
          {/* <button type="button" class="btn btn-primary">New Card</button> */}
          <Link to="/" className='histbt' >Home</Link>
          
          <Link to="/history" className='histbt' >History</Link>
          <div className='bucket pt-3'>
            <div className="histbt blue">Bucket List</div> 
            <BucketComponent onChange={(value)=>{
              setcurrentBucket(value)
            }} />
          </div>
        </div>
        <div className="col-lg-10">
          <CreateCard/>
          <CardDisplay bucketProp = {currentBucket} />
        </div>
      </div>
    </div>
  )
}

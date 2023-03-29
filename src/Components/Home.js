import React, { useState } from 'react'
import BucketComponent from './BucketComponent'
import CardDisplay from './CardDisplay'
import CreateCard from './CreateCard'

export default function Home() {
  const [currentBucket, setcurrentBucket] = useState("Select A Bucket")
  return (
    <div className='container'>
      <div className="row">
        <div className="col-lg-4">
          {/* <button type="button" class="btn btn-primary">New Card</button> */}
          <div>
            Bucket List
            <BucketComponent onChange={(value)=>{
              setcurrentBucket(value)
            }} />
          </div>
        </div>
        <div className="col-lg-8">
          <CreateCard/>
          <CardDisplay bucketProp = {currentBucket} />
        </div>
      </div>
    </div>
  )
}

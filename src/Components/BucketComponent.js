import React, { useEffect, useState } from 'react'

const BucketComponent = props => {
    const [buckets, setbuckets] = useState(null)
    useEffect(() => {
        fetch("http://localhost:8000/buckets")
        .then(res =>{
          return res.json()
        })
        .then(data =>{
          setbuckets(data);
        })
    }, [])
    
    const handleBucket =(e) =>{
        props.onChange(e)
    }

  return (
    <div>
        <ul>
            {buckets && buckets.map((bucket)=>{
                return <li><button onClick={(e) => handleBucket(bucket.bname)}>{bucket.bname}</button></li>
            })}
        </ul>
    </div>
  )
}

export default BucketComponent
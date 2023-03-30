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
        
            {buckets && buckets.map((bucket)=>{
                return <div><button className='bktbt' onClick={(e) => handleBucket(bucket.bname)}>{bucket.bname}</button></div>
            })}
        
    </div>
  )
}

export default BucketComponent
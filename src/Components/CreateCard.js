import React ,{ useEffect, useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import axios from "axios";
export default function CreateCard() {

    const [card, setcard] = useState({
        pk: 0,
        name: "",
        link: "",
        bucket: "",
        
      })

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

    const onChange = (e) => {
        setcard({...card, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        // console.log(user);
        axios.post("http://localhost:8000/cards", card)
        .then((response) =>{
          console.log(response);
          window.location.reload(false);

        })
        .catch((error)=>{
          console.log(error);
          
        })
        
        var flag =0
        buckets.map((bkt) =>{
          if(card.bucket === bkt.bname){
            flag =1;
            
          }
          return null
        })

        if(flag === 0){
          const bucket = {
            bname:card.bucket
          }
          axios.post("http://localhost:8000/buckets",bucket)
          .then((res)=>{
            console.log(res);
            window.location.reload(false);
          })
        }
        
      };

  return (
    <div className="row display-flex justify-content-center fl-cl">
      <div className="col-lg-6 blue pt-5"><h3>Create New Card</h3></div>
      <div className="col-lg-4">
      <Form onSubmit={(e) => {handleSubmit(e)}}>
              <FormGroup>
                <Input
                  type="text"
                  name="name"
                  onChange={(e) =>{onChange(e)}}
                  value={card.name}
                  placeholder ="Name"
                  required
                  className="mt-4 mb-4"

                />
              </FormGroup>
              <FormGroup>
              
                <Input
                  type="text"
                  name="link"
                  onChange={(e) =>{onChange(e)}}
                  value={card.link}
                  required
                  placeholder="Link"
                  className="mt-4 mb-4"

                />
              </FormGroup>
              <FormGroup>
                
                <Input
                  type="text"
                  name="bucket"
                  onChange={(e) =>{onChange(e)}}
                  value={card.bucket}
                  required
                  placeholder="Bucket"
                  className="mt-4 mb-4"

                />
              </FormGroup>

              <div className="extbt">
                <button className="btn btn-primary">
                    <span id="afterload">Create</span>
                </button>
              </div>
        </Form>

      </div>
    </div>
  )
}

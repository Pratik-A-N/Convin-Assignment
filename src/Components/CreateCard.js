import React ,{ useEffect, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
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
    <div>
        <Form onSubmit={(e) => {handleSubmit(e)}}>
              <FormGroup>
                <Label for="" >Name:</Label>
                <Input
                  type="text"
                  name="name"
                  onChange={(e) =>{onChange(e)}}
                  value={card.name}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="" >Link:</Label>
                <Input
                  type="text"
                  name="link"
                  onChange={(e) =>{onChange(e)}}
                  value={card.link}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="" >Bucket:</Label>
                <Input
                  type="text"
                  name="bucket"
                  onChange={(e) =>{onChange(e)}}
                  value={card.bucket}
                  required
                />
              </FormGroup>

              <div className="extbt">
                <button className="bt1">
                    <span id="afterload">Create</span>
                </button>
              </div>
        </Form>

    </div>
  )
}

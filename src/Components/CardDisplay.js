import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Form, FormGroup, Input, Label } from "reactstrap";



export default function CardDisplay({bucketProp}) {
    // console.log(bucketProp);
    const [cardDisplay, setcardDisplay] = useState(null);
    const [checkAll, setcheckAll] = useState(false)
    const [isCheck, setIsCheck] = useState([]);

    const [Editcard, setEditcard] = useState({
          name: "",
          link: "",
          bucket: "",
      
  })
    useEffect(() => {
      fetch("http://localhost:8000/cards")
      .then(res =>{
        return res.json()
      })
      .then(data =>{
        setcardDisplay(data);
      })
    },[])
    
    const handleCheckAll = (cardname) =>{
      setcheckAll(!checkAll)
      setIsCheck(cardDisplay.filter(card => card.bucket === cardname));
      if (checkAll) {
        setIsCheck([]);
      }
    }

    const handleCheck = (card) =>{
      if(isCheck.includes(card)){
        setIsCheck(isCheck.filter(i => i !== card))
      }else{
        setIsCheck([...isCheck,card])
      }
      
    }

    const handleDelete = (e) =>{
      isCheck.map(card => {
        var id = card.id
        axios.delete(`http://localhost:8000/cards/${id}`)
        .then(res => console.log(res))
        .catch((error)=>{
          console.log(error);
        })
        window.location.reload(false);

        return 0
      })
    }
    

    const handleEdit = (card,check) =>{
      var e = card.id
      if(check){
        document.getElementById("edit" + e).style.display = "block";
        document.getElementById("clsbt" + e).style.display = "block";
        document.getElementById("edbt" + e).style.display = "none";
        setEditcard(card)
      }else{
        
        document.getElementById("edit" + e).style.display = "none";
        document.getElementById("clsbt" + e).style.display = "none";
        document.getElementById("edbt" + e).style.display = "block";
      }
    }

    const handleMove = (card,check) =>{
      var e = card.id
      if(check){
        document.getElementById("move" + e).style.display = "block";
        document.getElementById("clsmvbt" + e).style.display = "block";
        document.getElementById("mvbt" + e).style.display = "none";
        setEditcard(card)
      }else{
        
        document.getElementById("move" + e).style.display = "none";
        document.getElementById("clsmvbt" + e).style.display = "none";
        document.getElementById("mvbt" + e).style.display = "block";
      }
    }

    const onChange = (e) => {
        setEditcard({...Editcard, [e.target.name]: e.target.value });
    };

    const handleChange = (e,id) =>{
      e.preventDefault();
      var editID = id
      // console.log(user);
      axios.put(`http://localhost:8000/cards/${editID}`, Editcard)
      .then((response) =>{
        console.log(response);
        window.location.reload(false);
      })
      .catch((error)=>{
        console.log(error);
      })
    };

    

  return (
    <div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" checked={checkAll} id="flexCheckDefault" onClick={() =>handleCheckAll(bucketProp)} />
        <label class="form-check-label" for="flexCheckDefault">
            Bucket: {bucketProp}
        </label>
      </div>
      
      <button type="button" class="btn btn-danger" onClick={()=> handleDelete()}>Delete Cards</button>
        {cardDisplay && cardDisplay.map((card)=>{
          if (card.bucket === bucketProp){
            return <div className="card" >
                      <div className="card-body">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id={card.id} onChange={() =>handleCheck(card)} checked={isCheck.includes(card)} key={card} />
                        {/* {console.log(isCheck.includes(card.id))} */}
                        <label class="form-check-label" for="flexCheckDefault">
                          <h5 className="card-title">{card.name}</h5>
                        </label>
                      </div>
                        <h6 className="card-subtitle mb-2 text-muted">{card.bucket}</h6>
                        <a href={card.link} className="card-link">Card link</a>
                        <button type="button" class="btn btn-success"  onClick={()=>handleEdit(card, true)} id={"edbt" + card.id} >Edit</button>
                        <button type="button" class="btn btn-secondary form-edit"  onClick={()=>handleEdit(card, false)} id={"clsbt" + card.id}  >Close</button>
                        <button type="button" class="btn btn-primary" onClick={()=>handleMove(card, true)} id={"mvbt" + card.id}>Move To</button>
                        <button type="button" class="btn btn-secondary form-edit"  onClick={()=>handleMove(card, false)} id={"clsmvbt" + card.id}  >Close</button>

                        {/* <button type="button" class="btn btn-danger" onClick={()=> handleDelete(card.id)}>Delete</button> */}
                        <Form onSubmit={(e) => {handleChange(e,card.id)}} id={"edit"+card.id} className="form-edit">
                          <FormGroup>
                            <Label for="" >Name:</Label>
                            <Input
                              type="text"
                              name="name"
                              onChange={(e) =>{onChange(e)}}
                              value={Editcard.name}
                              required
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label for="" >Link:</Label>
                            <Input
                              type="text"
                              name="link"
                              onChange={(e) =>{onChange(e)}}
                              value={Editcard.link}
                              required
                            />
                          </FormGroup>
                          

                          <div className="extbt">
                            <button className="bt1">
                                <span id="afterload">Save Changes</span>
                            </button>
                          </div> 
                        </Form>

                        <Form onSubmit={(e) => {handleChange(e,card.id)}} id={"move"+card.id} className="form-edit">
                          <FormGroup>
                            <Label for="" >Bucket:</Label>
                            <Input
                              type="text"
                              name="bucket"
                              onChange={(e) =>{onChange(e)}}
                              value={Editcard.bucket}
                              required
                            />
                          </FormGroup>
                          
                          

                          <div className="extbt">
                            <button className="bt1">
                                <span id="afterload">Move</span>
                            </button>
                          </div> 
                        </Form>
                        
                      </div>
                  </div>
          }else{
            return null
          }
          
        })}
        
    </div>
  )
}

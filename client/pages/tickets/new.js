import React from 'react';
import {useState} from 'react';
import useRequest from '../../hooks/use-request';
import { Router } from 'next/router';

const NewTicket = () => {
    const [title,setTitle] = useState('');
    const [price,setPrice] = useState('');
    const { doRequest , erros} = useRequest({
        url:'/api/tickets',
        method:'post',
        body:{
            price,title
        },
        onSuccess: (ticket) => Router.push('/')
    })

    const onSubmit = (event) =>{
        event.preventDefault();
        doRequest();
    };

    const onBlur = (e) =>{
        let price = parseFloat(e.target.value);

        if(isNaN(price)){
            return
        }
        setPrice(price.toFixed(2));
    }

  return (
    <div>
        <h2>Create a Ticket</h2>
        <form onSubmit={onSubmit}>  
            <div className="form-group">
                <label>Title</label>
                <input className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <div className="form-group">
                <label>Price</label>
                <input className="form-control" value={price} onChange={(e)=>setPrice(e.target.value)} onBlur={onBlur}/>
            </div>
            <button className="btn btn-primary">Submit</button>
        </form>

    </div>
  )
}

export default NewTicket;
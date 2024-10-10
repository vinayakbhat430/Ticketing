import React from 'react'
import useRequest from '../../hooks/use-request';
import Router from 'next/router';


const TicketShow = ({ticket}) => {
    const { doRequest , errors} = useRequest({
        url:'/api/orders',
        method:'post',
        body: {
            ticketId: ticket.id
        },
        onSuccess : (order) => Router.push('/orders/[orderId]', `/orders/${order.id}`)
    })
  return (
    <div>
        <h3>{ticket.title}</h3>
        <h2>{ticket.price}</h2>
        <button className="btn btn-primary" onClick={doRequest}>Purchase</button>
        {errors}
    </div>
  )
}

TicketShow.getInitialProps = async (context, client) =>{
    const { ticketId } = context.query;
    const { data } = await client.get(`/api/tickets/${ticketId}`)

    return { ticket: data}
}

export default TicketShow;
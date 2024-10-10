import React from 'react'

const Orders = ({orders}) => {
  return (
    <div>
        <h1>Orders</h1>
        {orders.map(order => {
            return <li>{order.ticket.title} - {order.status}</li>
        })}
    </div>
  )
}

Orders.getInitialProps = async (context, client) =>{
    const { data } = await client.get(`/api/orders`)

    return { orders: data}
}


export default Orders
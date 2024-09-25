import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing','abc',{
    url: 'http://localhost:4222'
});

stan.on('connect', ()=>{
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        title:'concert',
        price:20,
        id:'123'
    });

    stan.publish('ticket:created', data,() =>{
        console.log('Event Published')
    })
})

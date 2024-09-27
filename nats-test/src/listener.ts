import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketsCreatedListener } from './events/ticket-created-listener';

const stan = nats.connect('ticketing', randomBytes(4).toString('hex') ,{
    url: 'http://localhost:4222'
});

stan.on('connect',()=>{
    console.log('Listener connected');

    stan.on('close',()=>{
        console.log('Nats connection closed!');
        process.exit();
    })

    new TicketsCreatedListener(stan).listen()
})

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())





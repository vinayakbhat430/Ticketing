import nats, { Message } from 'node-nats-streaming'

const stan = nats.connect('ticketing', '123' ,{
    url: 'http://localhost:4222'
});

stan.on('connect',()=>{
    console.log('Listener connected');

    const options = stan.subscriptionOptions().setManualAckMode(true);

    const subscription = stan.subscribe('ticket:created','orders-service-queue-group');


    subscription.on('message', (msg:Message) =>{
        const data = msg.getData()

        if(typeof data === 'string'){
            console.log(`Received event ${msg.getSequence()} with data: ${data}`)
        };
        msg.ack()
    });
})
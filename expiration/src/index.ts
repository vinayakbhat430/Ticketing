import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';

const start = async () => {
    if(!process.env.NATS_CLIENT_ID){
        throw new Error('Nats client Id Must be defined');
    }
    if(!process.env.NATS_URL){
        throw new Error('NATS URL Must be defined');
    }
    if(!process.env.NATS_CLUSTER_ID){
        throw new Error('NATS Cluster Id Must be defined');
    }
    try{
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID,process.env.NATS_URL );
        natsWrapper.client.on('close',()=>{
            console.log('NATS connection closed!');
            process.exit();
        })

        new OrderCreatedListener(natsWrapper.client).listen();

        console.log("Connected -> Expiration")

        process.on('SIGINT', () => natsWrapper.client.close())
        process.on('SIGTERM', () => natsWrapper.client.close())
    }
    catch(err){
        console.log(err)
    }
}
start();


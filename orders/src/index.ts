import mongoose from 'mongoose';
import {app} from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT_SECRET Must be defined');
    }
    if(!process.env.MONGO_URI){
        throw new Error('Mongo URI Must be defined');
    }
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

        process.on('SIGINT', () => natsWrapper.client.close())
        process.on('SIGTERM', () => natsWrapper.client.close())
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongo db')
    }
    catch(err){
        console.log(err)
    }
    app.listen(3000,()=>{
        console.log("listening -> orders -> 3000");
    })
}
start();


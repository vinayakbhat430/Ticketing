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
    try{
        await natsWrapper.connect('ticketing', '1234','http://nats-srv:4222/' );
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
        console.log("listening -> tickets -> 3000");
    })
}
start();


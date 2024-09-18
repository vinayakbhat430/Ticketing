import mongoose from 'mongoose';
import {app} from './app';

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT_SECRET Must be defined');
    }
    if(!process.env.MONGO_URI){
        throw new Error('Mongo URI Must be defined');
    }
    try{
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


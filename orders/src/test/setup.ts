import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt  from "jsonwebtoken";


declare global{
    var signin:(email?:string)=> string[]
}


let mongo: any;
jest.mock('../nats-wrapper');
beforeAll(async () => {
  process.env.JWT_KEY = "asdf";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  try{
    await mongoose.connect(mongoUri, {});
  }
  catch(err){
    console.log("Error connecting Mongodb", err)
    process.exit()
  }

});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db?.collections();

  if (collections) {
    for (let collection of collections) {
      await collection.deleteMany();
    }
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (email ='test@test.com') => {


  //build jwt payload
  const password = "password";
  const id =new mongoose.Types.ObjectId().toHexString()

  const payload = {email,id};

  //create jwt
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  //build session object 
  const session = {jwt:token};


  //turn session into json
  const sessionJSON = JSON.stringify(session);

  //take json and encode it to base64String
  const base64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=$${base64}`];
};

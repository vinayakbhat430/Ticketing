import request from "supertest";
import { app } from '../../app';
import { Ticket } from "../../models/tickets";
import mongoose from "mongoose";


it('it returns 404 if ticket is not found', async ()=> {
    const id = '66f69e28e493c683c7eb622d';
    await request(app)
    .get(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({})
    .timeout(5000)
    .expect(404)
});

it('returns ticket if the ticket is found', async ()=>{
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title:'concert',
        price: 20
    })
    .timeout(5000)
    expect(response.status).toBe(201)


    await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send({})
    .expect(200)
}, 60000);
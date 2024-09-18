import request from "supertest";
import { app } from '../../app';
import { Ticket } from "../../models/tickets";

it('it returns 404 if ticket is not found', async ()=> {
    await request(app)
    .get('/api/tickets/laskdfsdkmf')
    .send({})
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
    .expect(201)

    const ticketResponse  = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send({})
    .expect(200)
})
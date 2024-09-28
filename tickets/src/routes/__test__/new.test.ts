import  request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/tickets";
import { natsWrapper } from "../../nats-wrapper";

it('has a route handler listening to /api/tickets for post requests', async ()=>{
    const response = await request(app)
    .post('/api/tickets')
    .send({})

    expect(response.status).not.toEqual(404)
});

it('it can be accesses only if user signed in', async ()=>{
    const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({})
    expect(response.status).not.toEqual(401);

});

it('Returns error if invalid title is passed', async ()=>{
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title:'',
        price:10
    })
    .expect(400)
});

it('returns error if invalid price is passed', async ()=>{
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title:'asdfadf',
        price:-10
    })
    .expect(400)

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title:'asdfadf',
    })
    .expect(400)
});

it('Creates ticket with valid inputs', async () => {
    const ticketData = {
      title: 'Test Ticket',
      price: 20
    };
  
    const agent = request(app);
    const cookie = global.signin();
  
    try {
      const response = await agent
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send(ticketData)
        .timeout(5000); // Set a timeout for the request itself
      expect(response.status).toBe(201);
    } catch (error) {
      throw error;
    }
  
    const tickets = await Ticket.find({});
  
    expect(tickets.length).toEqual(1);
    expect(tickets[0].title).toEqual(ticketData.title);
    expect(tickets[0].price).toEqual(ticketData.price);
  }, 60000); // Increase timeout to 60 seconds

  it('publishes an event' , async ()=>{
    const ticketData = {
      title: 'Test Ticket',
      price: 20
    };
  
    const agent = request(app);
    const cookie = global.signin();
  
    try {
      const response = await agent
        .post('/api/tickets')
        .set('Cookie', cookie)
        .send(ticketData)
        .timeout(5000); // Set a timeout for the request itself
      expect(response.status).toBe(201);
    } catch (error) {
      throw error;
    }

    expect(natsWrapper.client.publish).toHaveBeenCalled()
  })
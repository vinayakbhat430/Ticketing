// import  request from "supertest";
// import { app } from "../../app";
// import { Ticket } from "../../models/tickets";

// it('has a route handler listening to /api/tickets for post requests', async ()=>{
//     const response = await request(app)
//     .post('/api/tickets')
//     .send({})

//     expect(response.status).not.toEqual(404)
// });

// it('it can be accesses only if user signed in', async ()=>{
//     const response = await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({})
//     expect(response.status).not.toEqual(401);

// });

// it('Returns error if invalid title is passed', async ()=>{
//     await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({
//         title:'',
//         price:10
//     })
//     .expect(400)
// });

// it('returns error if invalid price is passed', async ()=>{
//     await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({
//         title:'asdfadf',
//         price:-10
//     })
//     .expect(400)

//     await request(app)
//     .post('/api/tickets')
//     .set('Cookie', global.signin())
//     .send({
//         title:'asdfadf',
//     })
//     .expect(400)
// });

// // it('Creates ticket with valid inputs', async ()=>{
// //     let tickets = await Ticket.find({})
// //     console.log(tickets)
// //     expect(tickets.length).toEqual(0);

// //     const response = await request(app)
// //     .post('/api/tickets')
// //     .set('Cookie', global.signin())
// //     .send({
// //         title:'asdfadf',
// //         price:20
// //     })
// //     console.error(response)


// //     // .expect(201);

// //     let ticketsAfter = await Ticket.find({})
// //     console.log(ticketsAfter)
// //     expect(ticketsAfter.length).toEqual(1);
// // });

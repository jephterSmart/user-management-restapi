const request = require('supertest');
const app = require('../app');

describe('This test is used for authentication purpose, i.e., signup and login', () => {
    it("PUT /auth/signup ---> new user Object:{message: String,userId: String}",()=> {
            return request(app).put('/auth/signup')
            
            .send({ email: 'kaskidsky@gmail.com', password: 'mobile' })
            .set("Content-Type",'application/json')
            .expect('Content-Type',/json/)
            .expect(201)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: expect.stringMatching('User is created'),
                            userId: expect.any(String)
                        }
                    )
                )
            })
    })
    it("PUT /auth/signup ---> 422 not a valid email or password too short. Error Object",() => {
        return request(app).put('/auth/signup')
        
        .send({ email: 'Manny', password: 'cats' })
        .set('Content-Type','application/json')
        .expect("Content-Type",/json/)
        .expect(422)
        
    })
    it("POST /auth/login ---> login user Object:{message:String,userId:String,token:String}",()=>{
        return request(app).post('/auth/login')
        .set('Content-Type','application/json')
        .send({email:'uzezijephter@gmail.com',password:'mobile165'})
        .expect(200)
        .then(res => {
            expect(res.body).toEqual(
                expect.ObjectContaining({
                    message:'login sucessful!',
                    token: expect.any(String),
                    userId:expect.any(String)
                })
            )
        })
        
    })
    it("POST /auth/login ---> 401 user not found in our database or wrong password, Error Object",()=>{
        return request(app).put('/auth/login')
        
        .send({ email: 'Manny', password: 'cats' })
        .set('Content-Type','application/json')
        .expect("Content-Type",/json/)
        .expect(401)
    })
})
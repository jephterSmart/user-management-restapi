const request = require('supertest');
const app = require('../app');

describe('This test is used for making changes to the user acount, i.e., update and delete the user', () => {
    it("PUT /profile/user ---> update User data:{message: String,user: Object}",()=> {
            return request(app).put('/profile/user')
            
            .send({name:'uzezi Jephter',image:'default', age:24,friends:JSON.stringify(['girl','prosper'])})
            .set("Content-Type",'application/json')
            .set('Authorization','Bearer +"long string of text, which is going to fail"')
            .expect('Content-Type',/json/)
            .expect(201)
            .then(res => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: expect.stringMatching('User updated!'),
                            user: expect.any(Object)
                        }
                    )
                )
            })
    });
    it("GET /profile/user ---> get user profile Object:{message:String,user:Object}",()=>{
        return request(app).get('/profile/user')
        .set('Authorization', 'Bearer +"a long string that represent token. This is going to fail"')
    })
    it("DELETE /profile/user ---> delete account Object:{message:String,user:Object}",()=>{
        return request(app).delete('/profile/user')
        .set('Content-Type','application/json')
        .set('Authorization','Bearer +"a long string that represent token. This is going to fail"')
        .expect(200)
        .then(res => {
            expect(res.body).toEqual(
                expect.ObjectContaining({
                    message:'profile deleted',
                    user: expect.any(Object)
                })
            )
        })
        
    })
    
})
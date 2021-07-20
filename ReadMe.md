# User Management REST API Application
This is a very simple `REST API` that invole just one type, the `user type`.
This API will allow users to:
1. Create account
2. Then, Login with the account created,
3. Send his/her profile data to the rest api, i.e update it.
4. Send his/her picture to the rest api, and it will be saved in the server
5. Lastly, but not least, he/she will be able to delete his created account

## Libraries Used.
You can check them in the package.json file

## Getting Started
To run locally, clone this repository and run `npm install`
This will install all the dependencies.

Then, create your own **nodemon.json** file and in it place your own environmental 
variable, i.e.,
```
    {
    "env":{
        "PORT": <Your own availabale port>,
        "MONGO_URI":"<Your own connect string to a mongoDb database>",
        "SECRET": "<Your json webtoken secret key>"
    }
}
```
Lastly, run `npm run startDev`

## Documentation
There are six routes in this API, two for Authentication  and the other four for modification of the user
The first two endpoints are for authentication.
```/auth/signup```
    ```method``` used:
        : `PUT`
```    
    This route allows you to signup, data required as the body of payload are:
        `email`: The user unique email in our system
       `password`: The user password that must be more than five charaters
    This route returns either `json` data on success case or an `Errors`. The data return on success is:
        `message` : User is created
        `userId` : The Id of the user created
        The status code is `201`
    If there is an `Error`, It is either the error with the following status code
        `422` : A validation Error in your email or password
        `500` : An internal Server Error

```
> /auth/login
    `method` used:
        `POST`
 ```
    This route allows you to login into the account created, data required as the `body` of payload are:
        `email`: The user unique email in our system
        `password`: The user password that must be more than five charaters
    This route returns either `json` data on success case or an `Errors`. The data return on success is:
        `message` : login sucessful!
        `userId` : The Id of the user created
        `token` : The webtoken generated 
        The status code is `200`
    If there is an `Error`, It is either the error with the following status code
        `401` : Either a wrong password or not a registered email
        `500` : An internal Server Error
```
The following three endpoints are for modifying the created user,
For the following four endpoint, you have to provide the header:
`Authorization`: 'Bearer <token sent to you during login>'

`/profile/user`
    `method` used:
        `GET`
```
    This route allows you to get data about your self.This route returns either `json` data on success case or an `Errors`. The data return on success is:
        `message` : User updated!
        `user` : The updated user data
        The status code is `200`
    If there is an `Error`, It is either the error with the following status code
        `404` : No user with Id sent
        `500` : An internal Server Error
```

`/profile/user`
    `method` used:
        `PUT`
```
    This route allows you to update your own data, data required as the `body` of payload are:
       if an image is being sent, it must have a key of `image`.
       if no image is being sent, then set the `image` key to `default`
       Any amount of data can be sent with the desired key
    This route returns either `json` data on success case or an `Errors`. The data return on success is:
        `message` : User updated!
        `user` : The updated user data
        The status code is `201`
    If there is an `Error`, It is either the error with the following status code
        `422` : Select a profile Image
        `404` : No user with Id sent
        `500` : An internal Server Error
```
`/profile/user`
    `method` used:
        `POST`
```
    This route allows you to post your profile picture explicitly , data required as the `body` of payload is:
        The file selected for upload. File type must `jpeg || jpg` || `png` 
    This route returns either `json` data on success case or an `Errors`. The data return on success is:
        `message` : user profile Picture Added
        `imageUrl` : Where the image can be found
        The status code is `201`
    If there is an `Error`, It is either the error with the following status code
        `404` : The user not found
        `422` : No image file has been selected
        `500` : An internal Server Error
```

`/profile/user`
    `method` used:
        `DELETE`
```
    This route allows you to delete your own account created. No data is required.
    This route returns either `json` data on success case or an `Errors`. The data return on success is:
        `message` : profile deleted
        `user` : The deleted user data
        The status code is `200`
    If there is an `Error`, It is either the error with the following status code:
        `404` : No user with Id sent
        `500` : An internal Server Error
```
Visit Application (https://user-management-restapi.herokuapp.com/)[https://user-management-restapi.herokuapp.com/]

### Thanks for Using.


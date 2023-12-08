# learn-backend
this repository use for learn backend java script CRUD from this tutorial [link yt](https://youtu.be/_ee38nL13mE?si=Dl2eP_vjwaRMmUhu)

    git clone git@github.com:tiaradwim1306/learn-backend.git

### Install dependencies
    npm install

### run application
    npm start

## API POSTMAN
### GET OPTIONS
- GET ALL USERS : access with this URL <code>localhost:5000/api/user/ </code>
- GET BLOG ALL BLOGS : access with this URL <code>localhost:5000/api/blog</code>
- GET BLOG ALL BLOGS : access with this URL <code>localhost:5000/api/blog/blog_id</code>
- GET BLOG BY USER_ID : access with this URL <code>localhost:5000/api/blog/user/user_id</code>

### POST OPTIONS
- REGISTER : access with this URL <code>localhost:5000/api/user/register </code>menggunakan postman
```
{
  "name": "tiaradwim1306",
  "email": "tiaradwim1306@gmail.com",
  "password": "password"
}
```

- LOGIN :  access with this URL <code>localhost:5000/api/user/login </code>menggunakan postman, add the existing email and password from the previous step 
```
{
  "email": "tiaradwim1306@gmail.com",
  "password": "password"
}
```

- ADD_BLOG : access with this URL <code>localhost:5000/api/blog/add</code>
```
{
    "title": "My First Blog",
    "description": "this is my first blog", 
    "image": "test.png",
    "user": "6572e281a575a9cdd9f30a35"
}
```
  note : <b>user from user id</b>

### PUT OPTION
- UPDATE_BLOG : access with this URL <code>localhost:5000/api/blog/update/blog_id</code>
```
{
    "title": "Tiara's Website",
    "image": "xxx.jpeg"
}
```
### DELETE OPTION
- DELETE_BLOG : access with this URL <code>localhost:5000/api/blog/blog_id</code>


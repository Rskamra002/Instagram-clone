# DOCS TO USE API

### REGISTER

POST URL - `/register`

PARAMS

```json
{
  "email": "youremail@email.com",
  "fullname": "yourfullname",
  "username": "yourusername",
  "password": "yourpassword"
}
```

RESPONSE
Success (Status Code - `201`)

```json
{
  "message": "User registered successfully"
}
```

---

### LOGIN

POST URL - `/login`

PARAMS

```json
{
  "username": "yourusername",
  "password": "yourpassword"
}
```

OR

```json
{
  "email": "youremail@email.com",
  "password": "yourpassword"
}
```

RESPONSE
Success (Status Code - `200`)

```json
{
  "message": "User login successsfully",
  "data": "USERDATA"
}
```

---

### GET ALL USERS

GET URL - `/users`

RESPONSE
Success (Status Code - `200`)

```json
{
  "data": "USERSDATA"
}
```

Paginate
Use `\_page` and optionally `\_limit` to paginate returned data.

```javascript
  GET /users?\_page=7
  GET /users?\_page=7&\_limit=20
```

---

### GET A PARTICULAR USER

GET URL - `/users/:username` OR `/user/:id`

RESPONSE
Success (Status Code - `200`)

```json
{
  "data": "USERDATA"
}
```

---

### FOLLOW SOMEONE

PATCH URL - `/users/follow/:id`
<br/>

`id(user) is going to follow userId(user)`

PARAMS

```json
{
  "userId": "userID"
}
```

RESPONSE

Success (Status Code - `200`)

```json
{
  "data": "USERDATA"
}
```

---

### UNFOLLOW SOMEONE

PATCH URL - `/users/unfollow/:id`
<br />

`id(user) is going to unfollow userId(user)`

PARAMS

```json
{
  "userId": "userID"
}
```

RESPONSE

Success (Status Code - `200`)

```json
{
  "data": "USERDATA"
}
```

---

### SAVE POST

PATCH URL - `/users/savepost/:id`
<br />

`id(user) is going to save postId(post)`

PARAMS

```json
{
  "postId": "postID"
}
```

RESPONSE

Success (Status Code - `200`)

```json
{
  "data": "USERDATA"
}
```

---

### REMOVE SAVED POST

PATCH URL - `/users/removesavedpost/:id`
<br />

`id(user) is going to remove saved postId(post)`

PARAMS

```json
{
  "postId": "postID"
}
```

RESPONSE

Success (Status Code - `200`)

```json
{
  "data": "USERDATA"
}
```

---

### GET ALL POSTS

GET URL - `/posts`

RESPONSE
Success (Status Code - `200`)

```json
{
  "data": "POSTS"
}
```

Paginate
Use `\_page` and optionally `\_limit` to paginate returned data.

```javascript
  GET /users?\_page=7
  GET /users?\_page=7&\_limit=20
```

---

### GET A PARTICULAR POST

GET URL - `/posts/:id`
<br />

`id - postId`

RESPONSE
Success (Status Code - `200`)

```json
{
  "data": "POST"
}
```

---

### GET ALL POSTS OF A USER get all posts of a user

GET URL - `/posts/user/:id`
<br />

`id - userId`

RESPONSE
Success (Status Code - `200`)

```json
{
  "data": "POSTS"
}
```

---

### ADD NEW POST

POST URL - `posts/addpost`
<br />

PARAMS

```json
{
  "src": "src",
  "userId": "userId "
}
```

RESPONSE
Success (Status Code - `201`)

```json
{
  "message": "Post added successfully"
}
```

---

### LIKE POST

PATCH URL - `/posts/likepost/:id`
<br />

`id - postId`

PARAMS

```json
{
  "userId": "userId "
}
```

RESPONSE
Success (Status Code - `200`)

```json
{
  "message": "Liked post successfully",
  "data": "POST"
}
```

---

### UNLIKE POST

PATCH URL - `/posts/unlikepost/:id`
<br />

`id - postId`

PARAMS

```json
{
  "userId": "userId "
}
```

RESPONSE
Success (Status Code - `200`)

```json
{
  "message": "Unliked post successfully",
  "data": "POST"
}
```

---

### ADD COMMENT ON POST

PATCH URL - `/posts/addcomment/:id`
<br/>

`id - postId`

PARAMS

```json
{
  "userId": "userId",
  "comment": "commentContent"
}
```

RESPONSE
Success (Status Code - `200`)

```json
{
  "message": "Comment added successfully",
  "data": "POST"
}
```

---

import express  from "express";

// 

const app = express();

const users = [
    'mathesu',
    'calaca',
    'teste'
];

app.get("/user", (request, response) => {
    console.log('listagem de usuarios');
    
    return response.json(users);
});


app.get("/user/:id", (request, response) => {
   const id = Number(request.params.id);
    
    return response.json(users[id]);
});

app.post("/user", (request, response) => {
   
    const user = {
        name: 'Diego',
        email: 'diego@gmeil.com'
    }
    return response.json(user);
});

app.listen(3333);

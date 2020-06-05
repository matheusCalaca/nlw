import express  from "express";

// 

const app = express();
app.use(express.json());

const users = [
    'mathesu',
    'calaca',
    'teste'
];

app.get("/user", (request, response) => {
    console.log('listagem de usuarios');
    const search = String(request.query.search);
    const userFilter = search ? users.filter(user => user.includes(search)) : users
    return response.json(userFilter);
});


app.get("/user/:id", (request, response) => {
   const id = Number(request.params.id);
    
    return response.json(users[id]);
});

app.post("/user", (request, response) => {
   const data = request.body;
    const user = {
        name: data.name,
        email: data.email
    }
    return response.json(user);
});

app.listen(3333);

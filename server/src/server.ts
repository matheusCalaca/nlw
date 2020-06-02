import express  from "express";

// 

const app = express();

app.get("/user", (request, response) => {
    console.log('listagem de usuarios');
    
    response.json([
        'mathesu',
        'calaca',
        'teste'
    ]);
});

app.listen(3333);

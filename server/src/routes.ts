import express from 'express';
import Knex from './database/connection';

import PointsController from './controllers/PointsController';


const routes = express.Router();
const pointController = new PointsController();

routes.get("/items", async (request, response) => {
    const items = await Knex('items').select('*');
    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    });

    return response.json(serializedItems);
});

routes.post("/points", pointController.create);

export default routes;
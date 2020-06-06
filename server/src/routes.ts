import express from 'express';
import Knex from './database/connection';

const routes = express.Router();

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
routes.post("/points", async (request, response) => {
    const {
        name,
        email,
        latitude,
        longitude,
        whatsapp,
        city,
        uf,
        items
    } = request.body;

    const ids = await Knex('points').insert({
        image: 'image-fake',
        name,
        email,
        latitude,
        longitude,
        whatsapp,
        city,
        uf
    });

    const pointItems = items.map((item_id: Number) => {
        return {
            items_id: item_id,
            point_id: ids[0],
        }
    });

    await Knex('point_items').insert(pointItems);

    return response.json({ sucesso: true });
});

export default routes;
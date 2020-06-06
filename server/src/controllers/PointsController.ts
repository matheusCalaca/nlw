import { Request, Response } from 'express';
import Knex from '../database/connection';

class PointsController {


    async show(request: Request, response: Response) {

        const { id } = request.params;

        const point = await Knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ mensage: 'point not found' });
        } else {
            return response.json(point);

        }
    }

    async create(request: Request, response: Response) {
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

        const point = {
            image: 'image-fake',
            name,
            email,
            latitude,
            longitude,
            whatsapp,
            city,
            uf
        };

        const trx = await Knex.transaction();

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItems = items.map((item_id: Number) => {
            return {
                items_id: item_id,
                point_id: point_id,
            }
        });

        await trx('point_items').insert(pointItems);
        return response.json({
            id: point_id,
            ...point
        });
    }


}

export default PointsController;
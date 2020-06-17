import { Request, Response } from 'express';
import Knex from '../database/connection';


const baseUri = "http://192.168.1.9";

class PointsController {


    async index(request: Request, response: Response) {
        const {
            city,
            uf,
            items
        } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await Knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.items_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');


        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url: `${baseUri}:3333/uploads/${point.image}`
            }
        });

        return response.json(serializedPoints);

    }

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const point = await Knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({ mensage: 'point not found' });
        }

        const serializedPoint = {
            ...point,
            image_url: `${baseUri}:3333/uploads/${point.image}`
        };


        const items = await Knex('items')
            .join('point_items', 'items.id', '=', 'point_items.items_id')
            .where('point_items.point_id', id)
            ;

        return response.json({ point: serializedPoint, items });

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
            image: request.file.filename,
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

        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: Number) => {
                return {
                    items_id: item_id,
                    point_id: point_id,
                }
            });

        await trx('point_items').insert(pointItems);
        await trx.commit();
        return response.json({
            id: point_id,
            ...point
        });
    }


}

export default PointsController;
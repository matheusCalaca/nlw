import { Response, Request } from 'express';
import Knex from '../database/connection';

const baseUri = "http://192.168.1.9";

class ItemsController {


    async index(request: Request, response: Response) {
        const items = await Knex('items').select('*');
        const serializedItems = items.map(item => {
            return {
                id: item.id,
                title: item.title,
                image_url: `${baseUri}:3333/uploads/${item.image}`
            }
        });

        return response.json(serializedItems);
    }


}

export default ItemsController;
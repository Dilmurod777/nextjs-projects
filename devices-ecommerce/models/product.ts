import {Model} from "./model";

export interface ProductModel extends Model {
    image: any[];
    name: string;
    price: number;
    slug: any;
    details: string;
}

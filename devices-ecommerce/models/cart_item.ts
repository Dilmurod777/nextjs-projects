import {ProductModel} from "./product";

export interface CartItemModel extends ProductModel{
    quantity: number;
}

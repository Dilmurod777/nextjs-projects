import {Model} from "./model";

export interface BannerModel extends Model{
    buttonText: string;
    description: string;
    discount: string;
    image: any[];
    largeText1: string;
    largeText2: string;
    midText: string;
    product: string;
    saleTime: string;
    smallText: string;
}

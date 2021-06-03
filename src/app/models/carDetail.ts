import { Brand } from "./brand";
import { CarImage } from "./carImage";

export interface CarDetail{
    carId:number;
    carName:string;
    brandId:number;
    brandName:string;
    colorName:string;
    colorId:number;
    modelYear:number;
    dailyPrice:number;
    description:string;
    carImage:CarImage[];
    brand:Brand
    
}
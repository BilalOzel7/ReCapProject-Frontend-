export interface Rental{
    rentalId:string;
    customerName:string;
    customerId:number;
    brandName:string;
    userNameLastName:string;
    carId:number;
    rentDate:Date;
    returnDate:Date;
    totalRentPrice?:number;
}
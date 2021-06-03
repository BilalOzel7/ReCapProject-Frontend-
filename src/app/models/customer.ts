export interface Customer {
    customerId:number;
    userId:number;
    customerName:string;
    firstName:string;
    lastName:string;
    companyName:string;
    email : string;
    status:boolean;
}

export interface CustomerDetail extends Customer{
    firstName:string;
    lastName:string;
}
export interface CreditCard{
    cardId? : number;
    customerId? : number;
    nameOnTheCard : string;
    cardNumber : string;
    cardCvv:string;
    expirationDate : string;
    moneyInTheCard? : number;
}
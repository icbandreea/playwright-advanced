export interface Order {
    ticker: string;
    price: number;
    quantity: number;
    side: 'buy' | 'sell';
}
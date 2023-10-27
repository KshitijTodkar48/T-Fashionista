export interface ProductType {
    id: number;
    title: string;
    price: string;
    rating?: string;
    imageURL: string;
    published: Boolean;
    userId?: string;
}
export interface ProductType {
    id: number;
    title: string;
    description?: string;
    price: string;
    rating?: string;
    imageURL: string;
    published: boolean;
    userId?: string | undefined;
}
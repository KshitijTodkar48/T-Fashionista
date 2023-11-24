export type ButtonProps = {
    name: string;
    route?: "users" | "admin";
    type?: "button" | "submit" | "reset" | undefined;
    isAddedToCart?: boolean;
}
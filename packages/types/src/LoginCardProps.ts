export interface LoginCardProps {
    page: string;
    name?: string;
    handleSubmit?: (email:string,password:string) => void;
}
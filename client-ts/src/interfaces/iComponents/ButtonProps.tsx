export interface ButtonProps{
    className: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    text: string;
    type?: string;
}
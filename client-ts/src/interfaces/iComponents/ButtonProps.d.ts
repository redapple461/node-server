/// <reference types="react" />
export interface ButtonProps {
    id?: string;
    className: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    text: string;
    type?: string;
}

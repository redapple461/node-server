import { ChangeEvent } from 'react';
export interface RadioProps {
    id?: string;
    className: string;
    name?: string;
    type?: string;
    value: string;
    checked?: boolean;
    dispatch: (event: ChangeEvent<HTMLInputElement>) => void;
    text: string;
}

import { Hero } from '../../models/Hero';
export interface HListProps {
    heroes: Hero[];
    universe: string;
    dispatch: Function;
}

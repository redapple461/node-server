import { Hero } from '../../models/Hero';
export interface HeroStore {
    searchUniverse: string;
    heroes: Hero[];
    oldName: string;
    addHero: Hero;
    detailHero: Hero;
    isLoad: boolean;
    noHeroes: boolean;
}

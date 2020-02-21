import { Hero } from '../models/Hero';
export declare const getHeroes: () => Promise<any>;
export declare const addHero: (data: Hero) => Promise<any>;
export declare const getByName: (name: string) => Promise<any>;
export declare const deleteByName: (name: string) => Promise<Response>;
export declare const updateHero: (oldName: string, body: Hero) => Promise<any>;

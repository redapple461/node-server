import { Hero } from '../models/Hero';
export declare const getHeroes: (token: string) => Promise<any>;
export declare const addHero: (data: Hero, token: string) => Promise<any>;
export declare const getByName: (name: string, token: string) => Promise<any>;
export declare const deleteByName: (name: string, token: string) => Promise<Response>;
export declare const updateHero: (oldName: string, body: Hero, token: string) => Promise<any>;
export declare const signIn: (email: string, password: string) => Promise<any>;
export declare const register: (email: string, password: string, name: string, surname: string, phone: string) => Promise<any>;

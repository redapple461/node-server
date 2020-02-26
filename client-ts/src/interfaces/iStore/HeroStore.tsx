import { Hero } from '../../models/Hero';

export interface HeroStore {
	searchUniverse: string;
	heroes: Hero[];
	oldName: string;
	addHero: Hero;
	detailHero: Hero;
	isLoad: boolean;
	noHeroes: boolean;
	email: string;
	password: string;
	registerEmail: string;
	registerPassowrd: string;
	userId: string;
	jwt: string;
	userName: string;
	surname: string;
	phone: string;
}

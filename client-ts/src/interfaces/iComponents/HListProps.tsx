import { Hero } from '../../models/Hero';

export interface HListProps{
	heroes: Hero[];
	universe: string;
	// tslint:disable-next-line: ban-types
	dispatch: Function;
}

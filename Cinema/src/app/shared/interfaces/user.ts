import { IBase } from './base';
import { IProblem } from './problem';

export interface IUser extends IBase {
    username: string;
    email: string;
    password: string;
    problems: IProblem[];
} 
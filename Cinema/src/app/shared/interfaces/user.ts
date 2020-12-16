import { IBase } from './base';
import { IComment } from './comment';
import { IProblem } from './problem';

export interface IUser extends IBase {
    username: string;
    email: string;
    password: string;
    problems: IProblem[];
    comments: IComment[];
} 
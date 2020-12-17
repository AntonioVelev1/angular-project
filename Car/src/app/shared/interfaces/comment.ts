import { IBase } from './base';
import { IProblem } from './problem';
import { IUser } from './user';

export interface IComment<T = string> extends IBase {
    text: string;
    userId: IUser;
    problemId: IProblem;
    likes: IUser[];
} 
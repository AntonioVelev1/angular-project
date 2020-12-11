import { IBase } from './base';
import { IUser } from './user';

export interface IProblem<T = string> extends IBase {
    problemName: string;
    description: string;
    imageUrl: string;
    userId: IUser;
} 
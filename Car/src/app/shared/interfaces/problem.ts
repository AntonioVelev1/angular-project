import { IBase } from './base';
import { IComment } from './comment';
import { IUser } from './user';

export interface IProblem<T = string> extends IBase {
    problemName: string;
    description: string;
    imageUrl: string;
    likes: IUser[];
    userId: IUser;
    comments: IComment[]
} 
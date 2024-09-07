import { Request } from 'express';

export interface RequestExtend extends Request {
    user?: any;
    files?: any;
}
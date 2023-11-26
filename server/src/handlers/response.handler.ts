import { Response } from 'express';

const responseWithData = (res: Response, statusCode: number, data: unknown) => res.status(statusCode).json(data);

export const error = (res: Response) =>
  responseWithData(res, 500, {
    status: 500,
    message: 'Oops! Something worng!'
  });

export const badrequest = (res: Response, message: string) => responseWithData(res, 400, { message });

export const ok = (res: Response, data: unknown) => responseWithData(res, 200, data);

export const created = (res: Response, data: unknown) => responseWithData(res, 201, data);

export const notfound = (res: Response, message: string) => responseWithData(res, 404, { message });

import { Response } from 'supertest'

// @ts-ignore
export const getResponseErrors = (res: Response) => JSON.parse(res.error.text).errors

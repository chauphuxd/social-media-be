import { error } from 'console';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core'
import User from '~/models/schemas/User.shema';
import { RegisterReqBody } from '~/models/User.requests';
import databaseService from '~/services/database.services';
import usersService from '~/services/users.services';

export const loginController = (req: Request, res: Response): any => {
    console.log(req.body);
    const { email, password } = req.body;
    if (email === 'tranphu@gmail.com' && password === '123456') {
        return res.status(200).json({ message: 'login successful' });

    }

    return res.status(400).json({ message: 'login failed' });
};


export const registerController = async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response): Promise<any> => {

    try {
        const result = await usersService.register(req.body);
        return res.json({
            message: 'Register success',
            result
        });

    } catch (error) {
        return res.status(401).json({ error: 'Register failed' });
    }
};

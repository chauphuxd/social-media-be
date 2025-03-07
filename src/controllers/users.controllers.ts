import { error } from 'console';
import { Request, Response } from 'express';
import User from '~/models/schemas/User.shema';
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


export const registerController = async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    try {
        const result = await usersService.register({ email, password });
        return res.json({
            message: 'Register success',
            result
        });

    } catch (error) {
        return res.status(400).json({ error: 'Register failed' });

    }


};

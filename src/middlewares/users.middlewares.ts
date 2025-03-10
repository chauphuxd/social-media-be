import { Request, Response, NextFunction } from 'express';
import { checkSchema } from 'express-validator';
import usersService from '~/services/users.services';
import { validate } from '~/utils/validation';

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            message: 'username and password are required'
        });
    }
    next();
}


export const registerValidator = validate(checkSchema({
    name: {
        notEmpty: true,
        isString: true,
        isLength: {
            options: {
                min: 1,
                max: 100
            }
        },
        trim: true
    },
    email: {
        notEmpty: true,
        isEmail: true,
        trim: true,
        custom: {
            options: async (value) => {
                const isExitsEmail = await usersService.checkEmailExits(value);
                if (isExitsEmail) {
                    throw new Error('Email already exists')
                }
                return true
            }
        }
    },
    password: {
        notEmpty: true,
        isString: true,
        isLength: {
            options: {
                min: 6,
                max: 50
            }
        },
        isStrongPassword: {
            options: {
                minLength: 6,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,

            },
            errorMessage: 'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
        }
    },
    confirm_password: {
        notEmpty: true,
        isString: true,
        isLength: {
            options: {
                min: 6,
                max: 50
            }
        },
        isStrongPassword: {
            options: {
                minLength: 6,
                minUppercase: 1,
                minNumbers: 1,
                minSymbols: 1,

            },
            errorMessage: 'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'

        },
        custom: {
            options: (value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password does not match !! ')
                }
                return true
            }
        }
    },
    date_of_birth: {
        isISO8601: {
            options: {
                strict: true,
                strictSeparator: true
            }
        }
    }

}))
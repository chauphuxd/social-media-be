import express from 'express';
import { body, validationResult, ContextRunner, ValidationChain } from 'express-validator';
import { RunnableValidationChains } from 'express-validator/lib/middlewares/schema';

// can be reused by many routes
export const validate = (validations: RunnableValidationChains<ValidationChain>) => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<any> => {
        await validations.run(req);
        const error = validationResult(req)
        // neu ko co loi
        if (error.isEmpty()) {
            return next();


        }
        return res.status(400).json({ errors: error.mapped() });

    }

};


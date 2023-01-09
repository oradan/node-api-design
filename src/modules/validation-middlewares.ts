import { body, validationResult } from 'express-validator'


export const checkIfExistInBody = (field: string) => {
    return body(field, `${field.charAt(0).toLocaleUpperCase() + field.slice(1)} was not provided`).exists().bail().notEmpty();
}

export const validateRequest = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(401).json(error)
    }
    next()
}
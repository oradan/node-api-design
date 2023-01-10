import { body, validationResult } from 'express-validator'
import prisma from "../db"


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

export const validateProductId = async (req, res, next) => {

    try {
        const product = await prisma.product.findUnique({
            where: {
                id: req.body.productId
            }
        })

        if (!product) {
            return res.status(401).json({ message: "the product id is not valid" })
        }
        req.product = product
        next()

    } catch (error) {

        return res.status(401).json({ message: "Server error" })
    }

}
import prisma from "../db"

export const getProducts = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: { products: true }
        })

        res.json({ data: user?.products })
    } catch (error) {
        next(error)
    }
}

export const getOneProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.findFirst({
            where: { id: req.params.id, authorId: req.user.id },
            include: { updates: true }
        })

        res.status(200).json({ data: product })

    } catch (error) {
        next(error)
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                authorId: req.user.id,
                description: req.body.description,
            }
        })

        res.status(200).json({ data: product })
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const update = await prisma.product.update({
            where: {
                id_authorId: {
                    id: req.params.id,
                    authorId: req.user.id
                }
            },
            data: {
                name: req.body.name,
                description: req.body.description,
            }
        })

        res.status(200).json({ data: update })
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const deleted = await prisma.product.delete({
            where: {
                id_authorId: {
                    id: req.params.id,
                    authorId: req.user.id
                }
            }
        })

        res.status(200).json({ data: deleted })
    } catch (error) {
        next(error)
    }
}

import prisma from "../db"

export const getProducts = async (req, res) => {
    try {
        // get the user that have a property products
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: { products: true }
        })

        res.json({ data: user?.products })
    } catch (error) {
        res.status(400).jason({ message: error })
    }
}

export const getOneProduct = async (req, res) => {
    const id = req.params.id;
    try {
        //get one product
        const product = await prisma.product.findFirst({
            where: { id: id, authorId: req.user.id }
        })

        res.status(200).json({ data: product })

    } catch (error) {
        res.status(400).jason({ message: error })
    }
}

export const createProduct = async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            authorId: req.user.id,
            description: req.body.description,
        }
    })

    res.status(200).json({ data: product })
}

export const updateProduct = async (req, res) => {
  const update = await prisma.product.update({
    where:{
        id_authorId: {
            id: req.params.id,
            authorId: req.user.id
        }
    }, 
    data:{
        name: req.body.name,
        description: req.body.description,
    }
  })

  res.status(200).json({ data: update })
}

export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_authorId: {
                id: req.params.id,
                authorId: req.user.id
            }
        }
    })

    res.status(200).json({ data: deleted })
}

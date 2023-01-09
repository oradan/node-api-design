import prisma from "../db";
import { comparePasswords, createJWT, hashPssword } from "../modules/auth";


export const createNewUser = async (req, res) => {

    try {
        const user = await prisma.user.create({
            data: {
                userName: req.body.userName,
                password: await hashPssword(req.body.password)

            }
        })

        const tocken = createJWT(user);
        res.json({ tocken })

    } catch (error) {
        res.json({ error })
    }
}

export const authenticateUser = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { userName: req.body.userName }
    })

    const isValidUser = await comparePasswords(req.body.password, user?.password);

    if (!isValidUser) {
        res.status(401).json({ message: "the pass does not mach" })
    }

    const tocken = createJWT(user);
    res.json({ tocken })
}

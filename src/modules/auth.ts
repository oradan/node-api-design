import jwt from "jsonwebtoken"

export const createJWT = (user): string => {
    const jwtUser = { id: user.id, userName: user.userName };
    const token = jwt.sign(user,process.env.JWT_SECTRET);
    return token;
}

export const authCheck = (req,res,next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        res.status(401).json({message:"not authorized"})
    }
}
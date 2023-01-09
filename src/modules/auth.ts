import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

export const createJWT = (user): string => {
    const jwtUser = { id: user.id, userName: user.userName };
    const token = jwt.sign(user, process.env.JWT_SECTRET);
    return token;
}

export const authCheck = (req, res, next) => {
    const bearer = req.headers.authorization;
    if (!bearer) {
        return notAuthorizedHandlerr(res, "not authorized")
    }

    const [, tocken] = bearer.split(' ');
    if (!tocken) {
        return notAuthorizedHandlerr(res, "the token is missing")
    }

    try {
        const user = jwt.verify(tocken, process.env.JWT_SECTRET);
        console.log(user)
        req.user = user;
        next()
    } catch (error) {
        return notAuthorizedHandlerr(res, error)
    }
}

export const hashPssword = (password) => {
    return bcrypt.hash(password, 5)
}

export const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash)
}
function notAuthorizedHandlerr(res, message) {
    return res.status(401).json({ message })
}
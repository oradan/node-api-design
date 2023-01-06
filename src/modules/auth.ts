import jwt from "jsonwebtoken"

export const createJWT = (user): string => {
    const jwtUser = { id: user.id, userName: user.userName };
    const token = jwt.sign(user,process.env.JWT_SECTRET);
    return token;
}
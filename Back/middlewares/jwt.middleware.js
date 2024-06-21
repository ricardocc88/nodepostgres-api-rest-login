import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, netx) => {
    
    let token = req.headers.authorization

    if(!token){
        return res.status(401).json({
            error: "Token not provided"

                })
    }
    
    token = token.split(" ")[1]
    console.log({token})
    try {
        const {email} = jwt.verify(token, process.env.JWT_SECRET)
        console.log(email)
        req.email = email
        netx()
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Token Invalido"})
    }
   
}
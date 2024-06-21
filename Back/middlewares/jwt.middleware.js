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
        // jwt.verify(token)
        netx()
    } catch (error) {
        
    }
   
}
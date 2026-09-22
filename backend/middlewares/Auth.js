import jwt from "jsonwebtoken";

export const ensureAuth = (req, res , next) =>{

    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(400).json({
            message:'Unathorized, JWT token is required!!'
        })
    }

    try {
        // 2. Extract the token out of the "Bearer <token>" format safely
        const token = auth.startsWith('Bearer ') 
            ? auth.split(' ')[1] 
            : auth;

        // 3. Verify the clean token string
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next(); // Move to the next controller route safely
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        return res.status(403).json({
            message: 'Unauthorized, JWT token is wrong or expired!!',
            success: false
        });
    }
}



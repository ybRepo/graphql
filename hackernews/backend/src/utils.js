const fs = require('fs')
const jwt = require('jsonwebtoken') 
const APP_PUBLIC = fs.readFileSync('./public.key', 'utf8') //Used to sign the JWTs issued for the user

// Takes care of protect resolvers that require authentication by checking user's authorization
function getUserId(context) {
    console.log("b/e server utils.js - this is the context received into getUserID function: ", context.request )

    const Authorization = context.request.get('Authorization')

    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')

        let verifyOptions = {
            expiresIn: "8h",
            algorithm: ["RS256"]
        };

        const {
            userId
        } = jwt.verify(token, APP_PUBLIC, verifyOptions )
        return userId
    }

    throw new Error('Not authenticated')
}

module.exports = {getUserId}
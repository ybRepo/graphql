const jwt = require('jsonwebtoken')
const APP_SECRET = 'Testing GraphQL Capabilities' //Used to sign the JWTs issued for the user

// Takes care of protect resolvers that require authentication by checking user's authorization
function getUserId(context) {
    const Authorization = context.request.get('Authorization')
    console.log('context.request.get is a function that returned: ', context.request.body)
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const {
            userId
        } = jwt.verify(token, APP_SECRET)
        return userId
    }

    throw new Error('Not authenticated')
}

module.exports = {
    APP_SECRET,
    getUserId,
}
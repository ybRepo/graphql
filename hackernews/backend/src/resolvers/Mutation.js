const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {
    APP_SECRET,
    getUserId
} = require('../utils')

// Takes care of user signup.
async function signup(parent, args, context, info) {
    // 1
    const password = await bcrypt.hash(args.password, 10)
    // 2
    const user = await context.prisma.createUser({ ...args,
        password
    })

    // 3
    const token = jwt.sign({
        userId: user.id
    }, APP_SECRET)

    // 4
    return {
        token,
        user,
    }
}

// Takes care of user login.
async function login(parent, args, context, info) {
    // 1 - Query User with email entered by user
    const user = await context.prisma.user({
        email: args.email
    })
    if (!user) {
        throw new Error('No such user found')
    }

    // 2 - User exists, but check if password is valid by comparing hashed password from login screen to hashed password in db.
    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    // 3 - create token signed with userID and app_secret
    const token = jwt.sign({
        userId: user.id
    }, APP_SECRET)

    // 4 - return token to client
    return {
        token,
        user,
    }
}

// Takes care of creating new link by calling the createLink method in prisma
function post (parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createLink({
        description: args.description,
        url: args.url,
        postedBy: {connect: {id: userId}}
    })
}

async function vote(parent, args, context, info) {
    // 1
    const userId = getUserId(context)

    // 2
    const linkExists = await context.prisma.$exists.vote({
        user: {
            id: userId
        },
        link: {
            id: args.linkId
        },
    })
    if (linkExists) {
        throw new Error(`Already voted for link: ${args.linkId}`)
    }

    // 3
    return context.prisma.createVote({
        user: {
            connect: {
                id: userId
            }
        },
        link: {
            connect: {
                id: args.linkId
            }
        },
    })
}

module.exports = {
    signup,
    login,
    post,
    vote
}
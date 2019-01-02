// Takes care of querying feed by calling the prisma client method "links()"
// Context is the initialized instance of the prisma client

async function feed(parent, args, context, info) {
    const where = args.filter ? { OR: [{description_contains: args.filter}, {url_contains: args.filter}],} : {}

    const links = await context.prisma.links(
        {where}
    ) 

    return links
}

function users(parent, args, context, info) {
    return context.prisma.users()
}

module.exports = {
    feed,
    users,
}
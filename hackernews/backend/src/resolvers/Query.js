// Takes care of querying feed by calling the prisma client method "links()"
// Context is the initialized instance of the prisma client

async function feed(parent, args, context, info) {
    const where = args.filter ? { 
        OR: [                                               //this is an operator used by prisma to pass multiple filter strings
            {description_contains: args.filter}, 
            {url_contains: args.filter}
        ],
    } : {}

    const links = await context.prisma.links(
        {
            where,
            skip: args.skip,
            first: args.first,
            orderBy: args.orderBy,
        }
    ) 

    const count = await context.prisma
    .linksConnection({                                      // using the linksConnection query from the Prisma client API to retrieve the total number of Link elements currently stored in the database.
        where,
    })
    .aggregate()
    .count()

    return {                                               // Takes care of returning values for links and counts const which adher to the Feed type
        links,
        count
    }
}

function users(parent, args, context, info) {
    return context.prisma.users()
}

module.exports = {
    feed,
    users,
}
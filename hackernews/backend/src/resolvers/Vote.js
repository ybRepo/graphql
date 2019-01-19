function link(parent, args, context) {
    return context.prisma.vote({
        id: parent.id
    }).link()
}

function user(parent, args, context) {
    console.log("this is the parent details for the vote resolver: ", parent) // it returned { id: 'cjr2lro9700bq0737aik8rf3w' }
    return context.prisma.vote({
        id: parent.id
    }).user()
}

module.exports = {
    link,
    user,
}

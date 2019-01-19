function link(parent, args, context) {
    return context.prisma.vote({
        id: parent.id
    }).link()
}

function user(parent, args, context) {          // parent returned { id: 'cjr2lro9700bq0737aik8rf3w' }
    return context.prisma.vote({
        id: parent.id
    }).user()
}

module.exports = {
    link,
    user,
}

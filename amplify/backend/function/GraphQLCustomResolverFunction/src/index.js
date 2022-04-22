const {
    searchAllResources,
    fetchAllResources,
    listCollaborationsDiscoverResolver,
    likeResource,
    unlikeResource,
    listContentsDiscoverResolver,
    listOpportunitiesDiscoverResolver,
    getResourceReactions,
    listConnectionPosts,
    getSeeker
} = require('./apis')


const Resolvers = {
    Query: {
        search: (ctx) => {
            return searchAllResources(ctx.arguments.query)
        },
        listDiscover: (ctx) => {
            return fetchAllResources(ctx.arguments.nextToken, ctx.arguments.limit)
        },
        listContentsDiscover(ctx) {
            return listContentsDiscoverResolver(ctx)
        },
        listOpportunitiesDiscover(ctx) {
            return listOpportunitiesDiscoverResolver(ctx)
        },
        listCollaborationsDiscover(ctx) {

            return listCollaborationsDiscoverResolver(ctx)
        },
        listConnectionsDiscover(ctx) {
            return listConnectionPosts(ctx)
        }
    },
    Mutation: {
        likeResource: (ctx) => {
            return likeResource(ctx)
        },
        unlikeResource: (ctx) => {
            return unlikeResource(ctx)
        }
    },
    Collaboration: {
        likes: (ctx) => {
            return getResourceReactions(ctx.source.id, ctx.source.__typename)
        }
    },
    Content: {
        likes: (ctx) => {
            return getResourceReactions(ctx.source.id, ctx.source.__typename)
        }
    },
    Post: {
        likes: (ctx) => {
            return getResourceReactions(ctx.source.id, ctx.source.__typename)
        }
    },
    Opportunity: {
        likes: (ctx) => {
            return getResourceReactions(ctx.source.id, ctx.source.__typename)
        }
    },
    ResourceReaction: {
        seeker: (ctx) => {
            return getSeeker(ctx.source.seekerId)
        }
    }
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    // console.log(`EVENT: ${JSON.stringify(event)}`);
    const typeHandler = Resolvers[event.typeName];
    if (typeHandler) {
        const resolver = typeHandler[event.fieldName];
        if (resolver) {
            return await resolver(event);
        }
    }
    throw new Error("Resolver not found.");
};

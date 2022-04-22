const AWS = require("aws-sdk");
const { opportunityProviderTable, seekerTable, likesTable, tables, friendshipTable, postTable } = require("../utils/constants")
const { paginate } = require('../utils')
const { v4: uuId } = require('uuid');

AWS.config.update({
    region: "eu-west-1",
});

const docClient = new AWS.DynamoDB.DocumentClient();


const searchResource = (query, tableName, fieldName) => {

    const params = {
        TableName: tableName,
        FilterExpression: `contains(${fieldName}, :q)`,
        ExpressionAttributeValues: {
            ":q": query
        }
    }
    return new Promise((resolve, reject) => {
        docClient.scan(params, (err, result) => {
            if (err) return reject(err);
            resolve(result)
        })
    })
}

const fetchResources = (tableName) => {
    const params = {
        TableName: tableName,
    }
    return new Promise((resolve, reject) => {
        docClient.scan(params, (err, result) => {
            if (err) return reject(err);
            resolve(result)
        })
    })
}
const getSeeker = (seekerId) => {
    const params = {
        TableName: seekerTable,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": seekerId,
        }
    }
    return new Promise((resolve, reject) => {
        docClient.query(params, (err, result) => {
            if (err) return reject(err);
            resolve(result?.Items?.[0])
        })
    })
}
const getOpportunityProvider = (opportunityProviderId) => {
    const params = {
        TableName: opportunityProviderTable,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": opportunityProviderId,
        }
    }
    return new Promise((resolve, reject) => {
        docClient.query(params, (err, result) => {
            if (err) return reject(err);
            resolve(result?.Items?.[0])
        })
    })
}
const alreadyLikedResource = (resourceId, seekerId, columnName) => {
    const params = {
        TableName: likesTable,
        Expression: "#columnName = :resourceTypeId AND seekerId = :seekerId",
        ExpressionNames: {
            "#columnName": `${columnName}`,
        },
        ExpressionValues: {
            ":resourceTypeId": resourceId,
            ":seekerId": seekerId
        }
    }
    return new Promise((resolve, reject) => {
        docClient.scan(params, (err, result) => {
            if (err) return reject(err);
            resolve(result.Items?.[0])
        })
    })
}
const createItem = (params) => {
    return new Promise((resolve, reject) => {
        docClient.put(params, (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}
const deleteItem = (params) => {
    return new Promise((resolve, reject) => {
        docClient.delete(params, (err, res) => {
            if (err) return reject(err)
            resolve(res);
        })
    })
}

const getResourceReactions = (resourceId, typeName) => {
    const columnName = `${typeName.toLowerCase()}Id`
    const params = {
        TableName: likesTable,
        Expression: "#columnName = :resourceTypeId",
        ExpressionNames: {
            "#columnName": `${columnName}`,
        },
        ExpressionValues: {
            ":resourceTypeId": resourceId
        }
    }
    return new Promise((resolve, reject) => {
        docClient.scan(params, (err, result) => {
            if (err) return reject(err);
            if (result.Items?.length) {
                return resolve({ items: result.Items.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) });
            }
            resolve({ items: [] })
        })
    })
}
const fetchFriendships = (seekerId, status) => {
    console.log({ seekerId, status })
    const params = {
        TableName: friendshipTable,
        FilterExpression: "#friendshipStatus = :status AND seekerId = :seekerId",
        ExpressionAttributeNames: {
            "#friendshipStatus": "status"
        },
        ExpressionAttributeValues: {
            ":seekerId": seekerId,
            ":status": status
        }
    }
    return new Promise((resolve, reject) => {
        docClient.scan(params, (err, result) => {
            if (err) return reject(err);
            resolve(result.Items)
        })
    })
}
const fetchFriendsPosts = (friendsIds = [], postStatus) => {
    let index = -1;
    const queryKey = friendsIds.reduce((prev, curr) => {
        const key = `:friendId${++index}`
        prev[key] = curr;
        return prev;
    }, {})
    const params = {
        TableName: postTable,
        FilterExpression: `postSeekerId IN (${Object.keys(queryKey).join(', ')}) AND #postStatus = :status`,
        ExpressionAttributeNames: {
            "#postStatus": "status"
        },
        ExpressionAttributeValues: {
            ...queryKey,
            ":status": postStatus
        }
    }
    return new Promise((resolve, reject) => {
        docClient.scan(params, (err, result) => {
            if (err) return reject(err);
            resolve(result.Items)
        })
    })
}
const fetchAllResources = async (nextToken, limit) => {
    let results = [];
    for (const table of tables) {
        try {
            try {
                const res = await fetchResources(table.name);
                if (res.Items?.length) {
                    results = [...results, ...res.Items]
                }
            } catch (e) {
                console.log(`Error loading ${table.name}`, e)
            }
        } catch (e) {

        }
    }
    const sortedResults = results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    return paginate(sortedResults, limit, nextToken)
}
const listContentsDiscoverResolver = async (ctx) => {
    const { arguments: args, prev: { result: { items } } } = ctx;

    const contentsStatus1 = items.filter(content => content.status === 1);
    const contentsStatus1ProviderStatus1 = [];

    for (const content of contentsStatus1) {
        try {
            const provider = await getOpportunityProvider(content.opportunityProviderId);
            if (provider.status === 1) {
                contentsStatus1ProviderStatus1.push(content);
            }
        } catch (e) { }
    }
    const { limit, nextToken } = args;

    const sortedContents = contentsStatus1ProviderStatus1.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const res = paginate(sortedContents, limit, nextToken);
    return { nextToken: res.nextToken, items: res.data }

}
const listOpportunitiesDiscoverResolver = async (ctx) => {
    const { arguments: args, prev: { result: { items } } } = ctx;

    const opportunitiesStatus1 = items.filter(opportunity => opportunity.status === 1);
    const opportunitesStatus1ProviderStatus1 = [];

    for (const opportunity of opportunitiesStatus1) {
        try {
            const provider = await getOpportunityProvider(opportunity.opportunityOpportunityProviderId);
            const currentDate = new Date().toISOString()
            if (provider.status === 1 && opportunity.date > currentDate && opportunity.applicationDeadline > currentDate) {
                opportunitesStatus1ProviderStatus1.push(opportunity);
            }
        } catch (e) { }
    }
    const { limit, nextToken } = args;

    const sortedContents = opportunitesStatus1ProviderStatus1.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const res = paginate(sortedContents, limit, nextToken);
    return { nextToken: res.nextToken, items: res.data }

}
const listCollaborationsDiscoverResolver = async (ctx) => {
    const { arguments: args, prev: { result: { items } } } = ctx;

    const collaborationsStatus1 = items.filter(collaboration => collaboration.status === 1);
    const collaborationsStatus1OwnerStatus1 = [];

    for (const collaboration of collaborationsStatus1) {
        try {
            const owner = await getSeeker(collaboration.collaborationOwnerId);
            const currentDate = new Date().toISOString();
            if (owner.status === 1 && collaboration.endDate > currentDate && collaboration.startDate > currentDate) {
                collaborationsStatus1OwnerStatus1.push(collaboration);
            }
        } catch (e) { }
    }
    const { limit, nextToken } = args;

    const sortedContents = collaborationsStatus1OwnerStatus1.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const res = paginate(sortedContents, limit, nextToken);
    return { nextToken: res.nextToken, items: res.data }

}
const likeResource = async (ctx) => {
    const { seekerId, postId, contentId, collaborationId, opportunityId } = ctx.arguments.input;
    const body = {
        seekerId,
        id: uuId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        __typename: "ResourceReaction"
    }
    if (postId) {
        const exists = await alreadyLikedResource(postId, seekerId, 'postId');
        if (exists) return exists;
        body['postId'] = postId;
        const params = {
            Item: body,
            TableName: likesTable,
        }
        await createItem(params);
        return body
    } else if (contentId) {
        const exists = await alreadyLikedResource(contentId, seekerId, 'contentId');
        if (exists) return exists;
        body['contentId'] = contentId;
        const params = {
            Item: body,
            TableName: likesTable,
        }
        await createItem(params);
        return body
    } else if (collaborationId) {
        const exists = await alreadyLikedResource(collaborationId, seekerId, 'collaborationId');
        if (exists) return exists;
        body['collaborationId'] = collaborationId;
        const params = {
            Item: body,
            TableName: likesTable,
        }
        await createItem(params);
        return body
    } else if (opportunityId) {
        const exists = await alreadyLikedResource(opportunityId, seekerId, 'opportunityId');
        if (exists) return exists;
        body['opportunityId'] = opportunityId;
        const params = {
            Item: body,
            TableName: likesTable,
        }
        await createItem(params);
        return body
    }
    else {
        throw Error('Either of postId, contentId, collaborationId or opportunityId is required')
    }
}
const unlikeResource = async (ctx) => {
    try {
        const { id } = ctx.arguments.input;
        const params = {
            Key: {
                id
            },
            TableName: likesTable,
            ReturnValues: "ALL_OLD"
        }

        const res = await deleteItem(params);
        return res.Attributes;
    } catch (error) {
        throw error
    }
}
const searchAllResources = async (query) => {
    let results = []
    for (const table of tables) {
        try {
            const res = await searchResource(query, table.name, table.column);
            if (res.Items?.length) {
                results = [...results, ...res.Items]
            }
        } catch (e) {
            console.log(`Error loading ${table.name}`, e)
        }
    }
    return results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}
const listConnectionPosts = async (ctx) => {
    const { seekerId, limit, nextToken } = ctx.arguments;
    if (!seekerId) throw Error("Missing seekerId argument")
    try {
        const friendships = await fetchFriendships(seekerId, 1);
        const friendsIds = friendships.map(friendship => friendship.friendId);
        const friendsPosts = await fetchFriendsPosts(friendsIds, 1);
        const sortedPosts = friendsPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return paginate(sortedPosts, limit, nextToken);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getResourceReactions,
    fetchAllResources,
    listContentsDiscoverResolver,
    listOpportunitiesDiscoverResolver,
    listCollaborationsDiscoverResolver,
    likeResource,
    unlikeResource,
    searchAllResources,
    listConnectionPosts,
    getSeeker
}
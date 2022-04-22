const { LIMIT } = require('./constants');

const paginate = (results, limit, nextToken) => {
    const index = results.findIndex(resource => resource.id === nextToken);
    const startIndex = index > -1 ? index : 0;
    const endIndex = limit ? startIndex + limit : startIndex + LIMIT;
    const nNextToken = results[endIndex + 1]?.id;
    const data = results.slice(startIndex, endIndex)
    return { nextToken: nNextToken, data }
}

module.exports = { paginate }
const items = [{
    id: "1",
    title: "This is opportunity title",
    location: "Opportunity location"
},
{
    id: "1",
    title: "Content title",
    caption: "Content caption"
}
]

exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*",
        //      "Access-Control-Allow-Headers": "*"
        //  }, 
        body: JSON.stringify(items),
    };
    return response;
};

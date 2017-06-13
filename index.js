import uuid from "uuid";
import AWS from "aws-sdk";

AWS.config.update({
  region: "us-west-2"
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export function create(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "PRODUCTS_TABLE",
    Item: {
      userID: event.requestContext.authorizer.claims.sub,
      productID: uuid.v1(),
      createdAt: new Date().getTime()
    }
  };

  dynamoDB.put(params, (err, data) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true
    };

    const response = {
      headers
    };

    if (err) {
      return callback(null, {
        ...response,
        statusCode: 500,
        body: JSON.stringify({ status: false })
      });
    }

    return callback(null, {
      ...response,
      statusCode: 200,
      body: JSON.stringify(params.Item)
    });
  });
}

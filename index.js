import uuid from "uuid";

import { failure, success } from "./lib/response";
import { call } from "./lib/dynamo";

const PRODUCTS_TABLE = "PRODUCTS_TABLE";

export async function create(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: PRODUCTS_TABLE,
    Item: {
      userID: event.requestContext.authorizer.claims.sub,
      productID: uuid.v1(),
      createdAt: new Date().getTime()
    }
  };

  try {
    const result = await call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    console.warn("[ERROR @ create product]", e);
    callback(null, failure({ status: false }));
  }
}

export async function get(event, context, callback) {
  const params = {
    TableName: PRODUCTS_TABLE,
    Key: {
      userID: event.requestContext.authorizer.claims.sub,
      productID: event.pathParameters.id
    }
  };

  try {
    const result = await call("get", params);
    if (result.Item) {
      callback(null, success(result.Item));
    } else {
      callback(null, failure({ status: false, error: "Item not found." }));
    }
  } catch (e) {
    console.warn("[ERROR @ get product]", e);
    callback(null, failure({ status: false }));
  }
}

export async function list(event, context, callback) {
  const params = {
    TableName: PRODUCTS_TABLE,
    KeyConditionExpression: "userID = :userID",
    ExpressionAttributeValues: {
      ":userID": event.requestContext.authorizer.claims.sub
    }
  };

  try {
    const result = await call("query", params);
    callback(null, success(result.Items));
  } catch (e) {
    console.warn("[ERROR @ list products]", e);
    callback(null, failure({ status: false }));
  }
}

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "product",
    Key: {
      userID: event.requestContext.authorizer.claims.sub,
      productID: event.pathParameters.id
    },
    // TODO: properly define what is in a product.
    // TODO: update mock as well
    // UpdateExpression: "SET content = :content, attachment = :attachment",
    // ExpressionAttributeValues: {
    //   ":attachment": data.attachment ? data.attachment : null,
    //   ":content": data.content ? data.content : null
    // },
    ReturnValues: "ALL_NEW"
  };

  try {
    const result = await dynamoDbLib.call("update", params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}

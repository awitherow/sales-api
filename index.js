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

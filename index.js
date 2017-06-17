//@flow
import uuid from 'uuid';

import { failure, success } from './src/helpers/response';
import { call } from './src/aws/dynamo';
import { validProduct } from './src/validation/product';
import type { Event, Product } from './src/types';

const PRODUCTS_TABLE = 'PRODUCTS_TABLE';

export async function create(event: Event, context: {}, callback: Function) {
    const data = JSON.parse(event.body);
    const valid = await validProduct((data: Product));

    if (typeof valid !== Error) {
        const params = {
            TableName: PRODUCTS_TABLE,
            Item: {
                userID: event.requestContext.authorizer.claims.sub,
                productID: uuid.v1(),
                createdAt: new Date().getTime(),
                ...data,
            },
        };

        try {
            const result = await call('put', params);
            callback(null, success(params.Item));
        } catch (e) {
            console.warn('[ERROR @ create product]', e);
            callback(null, failure({ status: false }));
        }
    } else {
        console.warn('[ERROR @ create product]', 'invalid product input');
        callback(null, failure({ status: false }));
    }
}

export async function get(event: Event, context: {}, callback: Function) {
    const params = {
        TableName: PRODUCTS_TABLE,
        Key: {
            userID: event.requestContext.authorizer.claims.sub,
            productID: event.pathParameters.id,
        },
    };

    try {
        const result = await call('get', params);
        if (result.Item) {
            callback(null, success(result.Item));
        } else {
            callback(
                null,
                failure({ status: false, error: 'Item not found.' }),
            );
        }
    } catch (e) {
        console.warn('[ERROR @ get product]', e);
        callback(null, failure({ status: false }));
    }
}

export async function list(event: Event, context: {}, callback: Function) {
    const params = {
        TableName: PRODUCTS_TABLE,
        KeyConditionExpression: 'userID = :userID',
        ExpressionAttributeValues: {
            ':userID': event.requestContext.authorizer.claims.sub,
        },
    };

    try {
        const result = await call('query', params);
        callback(null, success(result.Items));
    } catch (e) {
        console.warn('[ERROR @ list products]', e);
        callback(null, failure({ status: false }));
    }
}

export async function update(event: Event, context: {}, callback: Function) {
    const { title, description, photo, category, weight } = JSON.parse(
        event.body,
    );
    const params = {
        TableName: PRODUCTS_TABLE,
        Key: {
            userID: event.requestContext.authorizer.claims.sub,
            productID: event.pathParameters.id,
        },
        UpdateExpression: `
            SET photo = :photo,
            title = :title,
            description = :description,
            category = :category,
            weight = :weight
        `,
        ExpressionAttributeValues: {
            ':photo': Boolean(photo) && photo,
            ':title': Boolean(title) && title,
            ':description': Boolean(description) && description,
            ':category': Boolean(category) && category,
            ':weight': Boolean(weight) && weight,
        },
        ReturnValues: 'ALL_NEW',
    };

    try {
        const result = await call('update', params);
        callback(null, success({ status: true }));
    } catch (e) {
        console.warn('[ERROR @ update products]', e);
        callback(null, failure({ status: false }));
    }
}

export async function remove(event: Event, context: {}, callback: Function) {
    const params = {
        TableName: PRODUCTS_TABLE,
        // 'Key' defines the partition key and sort key of the item to be removed
        // - 'userID': User Pool sub of the authenticated user
        // - 'productID': path parameter
        Key: {
            userID: event.requestContext.authorizer.claims.sub,
            productID: event.pathParameters.id,
        },
    };

    try {
        const result = await call('delete', params);
        callback(null, success({ status: true }));
    } catch (e) {
        console.warn('[ERROR @ remove products]', e);
        callback(null, failure({ status: false }));
    }
}

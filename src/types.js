type Event = {
    body: string,
    pathParameters: {
        id?: string,
    },
    requestContext: {
        authorizer: {
            claims: {
                sub: string,
            },
        },
    },
};

type Product = {
    title: string,
    description: string,
    tags: Array<string>,
    category: string,
    weight: number,
    photo: string,
};

export default {
    Event,
};

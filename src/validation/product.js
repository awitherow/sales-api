import type { Product } from '../types';

function validProduct(product: Product): Promise<Error | boolean> {
    return new Promise((fulfill, reject) => {
        Object.keys(product).map(i => {
            const i = product[i];
            // TODO: figure out elegant way to verify.
            // if (
            //     (i === 'title' ||
            //         i === 'description' ||
            //         i === 'category' ||
            //         i === 'photo') &&
            //     typeof i !== 'string'
            // ) {
            //     reject(new Error(
            //         `[ERROR] @validProduct => product key/value mismatch at ${item}.`,
            //     ))
            // }
        });
        resolve(true);
    });
}

export default {
    validProduct,
};

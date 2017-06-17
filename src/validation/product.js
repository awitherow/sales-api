import type { Product } from '../types';

function validProduct(product: Product) {
    console.log(product);
    return true;
}

export default {
    validProduct,
};

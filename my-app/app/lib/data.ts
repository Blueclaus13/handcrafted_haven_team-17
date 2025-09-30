// The functions on this page will most likely have to change drastically after database integration has been set up. 

import { products } from './placeholder_data'

export default async function getAllProducts() {
    return products
}

export async function getRandomProducts() {
    return [...products]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
}
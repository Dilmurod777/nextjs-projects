import React from 'react';
import Link from 'next/link';
import {ProductModel} from "../models/product";
import {urlFor} from "../lib/client";

interface ProductInterface {
    product: ProductModel
}

function Product({product}: ProductInterface) {
    return (
        <div>
            <Link href={`/product/${product.slug?.current || product._id}`}>
                <div className={"product-card"}>
                    <img src={urlFor(product.image && product.image[0])}
                         alt={product.name}
                         width={250}
                         height={250}
                         className={"product-image"}
                    />
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">${product.price}</p>
                </div>
            </Link>
        </div>
    );
}

export default Product;

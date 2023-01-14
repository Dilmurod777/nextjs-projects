/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {AiOutlineMinus, AiOutlinePlus, AiOutlineStar, AiFillStar} from 'react-icons/ai';
import {client, urlFor} from "../../lib/client";
import {ProductModel} from "../../models/product";
import {Product} from "../../components";
import {useStateContext} from "../../context/StateContext";

interface ProductDetailsInterface {
    product: ProductModel;
    products: ProductModel[];
}

function ProductDetails({product, products}: ProductDetailsInterface) {
    const {image, name, details, price} = product;
    const [index, setIndex] = useState(0);
    const {decrementQty, incrementQty, qty, addToCart, resetQty, setShowCart} = useStateContext();

    const handleBuyNow = () => {
        addToCart(product, qty);
        setShowCart(true)
    }

    useEffect(() => {
        resetQty();
    }, [product])

    return (
        <div>
            <div className="product-detail-container">
                <div>
                    <div className={"image-container"}>
                        <Image
                            src={urlFor(image && image[index])}
                            alt={name}
                            width={400}
                            height={400}
                            className={"product-detail-image"}
                        />
                    </div>
                    <div className="small-images-container">
                        {image && image.map((item, i) => {
                            return <Image
                                key={i}
                                src={urlFor(item)}
                                alt={`small-image-${i}`}
                                width={70}
                                height={70}
                                className={i === index ? "small-image selected-image" : "small-image"}
                                onMouseEnter={() => setIndex(i)}/>
                        })}
                    </div>
                </div>

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity: </h3>
                        <p className={"quantity-desc"}>
                            <span className={"minus"} onClick={decrementQty}>
                                <AiOutlineMinus/>
                            </span>
                            <span className={"num"}>{qty}</span>
                            <span className={"plus"} onClick={incrementQty}>
                                    <AiOutlinePlus/>
                            </span>
                        </p>
                    </div>
                    <div className={"buttons"}>
                        <button
                            type={"button"}
                            className={"add-to-cart"}
                            onClick={() => addToCart(product, qty)}
                        >Add to Cart
                        </button>
                        <button
                            type={"button"}
                            className={"buy-now"}
                            onClick={handleBuyNow}
                        >Buy Now
                        </button>
                    </div>
                </div>
            </div>

            <div className={"maylike-products-wrapper"}>
                <h2>You May Also Like</h2>
                <div className={"marquee"}>
                    <div className="maylike-products-container track">
                        {products && products.map((item, i) => {
                            return <Product key={i} product={item}/>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths = async () => {
    const productsQuery = `*[_type == "product"]{slug{current}}`;
    const products = await client.fetch(productsQuery);
    const paths = products.map((product: any) => ({
        params: {slug: product.slug.current}
    }));

    return {paths, fallback: 'blocking'};
}

export const getStaticProps = async ({params: {slug}}: { params: { slug: string } }) => {
    const productQuery = `*[_type == 'product' && slug.current == '${slug}'][0]`;
    const product = await client.fetch(productQuery);

    const productsQuery = `*[_type == 'product']`;
    const products = await client.fetch(productsQuery);

    return {
        props: {product, products}
    }
}

export default ProductDetails;

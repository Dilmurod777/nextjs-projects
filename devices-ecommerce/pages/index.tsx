import React from 'react';
import {Product, FooterBanner, HeroBanner} from '../components';
import {client} from '../lib/client';
import {ProductModel} from '../models/product'
import {BannerModel} from '../models/banner'

interface HomeInterface {
    products: ProductModel[];
    banners: BannerModel[];
}

function Home(props: HomeInterface) {
    return (
        <>
            <HeroBanner heroBanner={props.banners.length ? props.banners[0] : null}/>

            <div className={'products-heading'}>
                <h2>Best Selling Products</h2>
                <p>Speakers of many variations</p>
            </div>
            <div className={'products-container'}>
                {props.products?.map((product) => {
                    return <Product key={product._id} product={product}/>;
                })}
            </div>

            <FooterBanner footerBanner={props.banners.length ? props.banners[0] : null}/>
        </>
    );
}

export const getServerSideProps = async () => {
    const productsQuery = '*[_type == "product"]';
    const products = await client.fetch(productsQuery);

    const bannerQuery = '*[_type == "banner"]';
    const banners = await client.fetch(bannerQuery);

    return {
        props: {products, banners}
    }
}

export default Home;

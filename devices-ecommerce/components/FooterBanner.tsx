import React from 'react';
import {BannerModel} from "../models/banner";
import Link from "next/link";
import {urlFor} from "../lib/client";

interface FooterBannerInterface {
    footerBanner: BannerModel | null;
}

function FooterBanner({footerBanner}: FooterBannerInterface) {
    if (!footerBanner) return <div/>;

    const {
        discount,
        largeText1,
        largeText2,
        smallText,
        midText,
        image,
        buttonText,
        description,
        product,
        saleTime
    } = footerBanner;
    return (
        <div className={'footer-banner-container'}>
            <div className={'banner-desc'}>
                <div className={'left'}>
                    <p>{discount}</p>
                    <h3>{largeText1}</h3>
                    <h3>{largeText2}</h3>
                    <p>{saleTime}</p>
                </div>
                <div className={'right'}>
                    <p>{smallText}</p>
                    <h3>{midText}</h3>
                    <p>{description}</p>
                    <Link href={`/product/${product}`}>
                        <button type={"button"}>{buttonText}</button>
                    </Link>
                </div>
                <img
                    src={urlFor(image)}
                    alt={product}
                    className={'footer-banner-image'}
                />
            </div>
        </div>
    );
}

export default FooterBanner;

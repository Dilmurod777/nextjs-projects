import React from 'react';
import Link from 'next/link';
import {BannerModel} from "../models/banner";
import {urlFor} from "../lib/client";

interface HeroBannerInterface {
    heroBanner: BannerModel | null;
}

function HeroBanner({heroBanner}: HeroBannerInterface) {
    if (!heroBanner) return <div/>;

    const {smallText, midText, largeText1, largeText2, image, product, buttonText, description} = heroBanner;
    return (
        <div className={"hero-banner-container"}>
            <div>
                <p className="beats-solo">{smallText}</p>
                <h3>{midText}</h3>
                <h1>{largeText1}</h1>
                <img src={urlFor(image)}
                     alt={product}
                     className={"hero-banner-image"}/>

                <div>
                    <Link href={`/product/${product}`}>
                        <button type={'button'}>{buttonText}</button>
                    </Link>
                    <div className={'desc'}>
                        <h5>Description</h5>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroBanner;

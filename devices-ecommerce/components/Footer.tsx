import React from 'react';
import {AiFillFacebook, AiFillInstagram} from 'react-icons/ai';
import Link from "next/link";

function Footer() {
    return (
        <div className={"footer-container"}>
            <p>2023 Devices Shop All rights are reserved</p>
            <p className="icons">
                <Link href={"https://instagram.com/dilmurod_valiev98"} target={"_blank"}>
                    <AiFillInstagram/>
                </Link>
                <Link href={"https://facebook.com/valievdilmurod"} target={"_blank"}>
                    <AiFillFacebook/>
                </Link>
            </p>
        </div>
    );
}

export default Footer;

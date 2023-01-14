import React, {useEffect} from 'react';
import Link from 'next/link';
import {BsBagCheckFill} from 'react-icons/bs';
import {runFireworks} from "../lib/utils";

import {useStateContext} from "../context/StateContext";

function Success() {
    const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext();

    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);

        runFireworks();
    }, [])

    return (
        <div className={'success-wrapper'}>
            <div className={'success'}>
                <p className={'icon'}>
                    <BsBagCheckFill/>
                </p>
                <h2>Thank you for your order!</h2>
                <p className="email-msg">Check your email inbox for receipt.</p>
                <p className="description">
                    If you have any questions, please contact us at
                    <a
                        className={'email'}
                        href="mailto:valiev.dilmurod1998@gmail.com"
                    >valiev.dilmurod1998@gmail.com</a>
                </p>
                <Link href={'/'}>
                    <button
                        type={"button"}
                        className={'btn'}
                    >Continue Shopping
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Success;

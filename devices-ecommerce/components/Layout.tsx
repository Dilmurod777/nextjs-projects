import React from 'react';
import Head from 'next/head';
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutInterface {
    children: React.ReactNode
}

function Layout(props: LayoutInterface) {
    return (
        <div className={'layout'}>
            <Head>
                <title>Devices Store</title>
            </Head>
            <header>
                <Navbar/>
            </header>
            <main className={"main-container"}>
                {props.children}
            </main>
            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default Layout;

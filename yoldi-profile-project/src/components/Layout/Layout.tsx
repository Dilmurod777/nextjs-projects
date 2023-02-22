import React from 'react';
import Header from "@/components/Layout/Header";

type LayoutProps = {
    children: React.ReactElement | React.ReactElement[]
};

const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <>
            <Header/>
            <main>{children}</main>
        </>
    );
};

export default Layout;

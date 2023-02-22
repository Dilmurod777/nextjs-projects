import React from 'react';
import {Julee} from '@next/font/google';
import {HeaderWrapper, Title} from "@/styles/Header";

type HeaderProps = {};

const julee = Julee({
    weight: "400",
    subsets: ["latin"]
});

const Header: React.FC<HeaderProps> = () => {
    return (
        <HeaderWrapper className={julee.className}>
            <Title>Etch-a-sketch</Title>
        </HeaderWrapper>
    );
};

export default Header;

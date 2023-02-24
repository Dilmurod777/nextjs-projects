import React from 'react';
import Header from "@/components/Layout/Header";
import {Button, Flex, Spinner, Text} from "@chakra-ui/react";
import {useUser} from "@/utils/swr";
import Link from "next/link";
import {useRouter} from "next/router";

type LayoutProps = {
    children: React.ReactElement | React.ReactElement[]
};

const Layout: React.FC<LayoutProps> = ({children}) => {
    const {isLoading, isError} = useUser()

    return (
        <>
            <Header/>
            <main>
                <Flex bgColor={'#f3f3f3'} h={'calc(100vh - 80px)'} w={'100%'}>
                    {isLoading && <Flex w={'100%'} justifyContent={'center'} alignItems={'center'}>
                        <Spinner color={'#000000'} h={'40px'} w={'40px'}/>
                    </Flex>}
                    {!isLoading && !isError && children}
                    {isError && <Flex w={'100%'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                        <Text mb={2}>Something went wrong! Please reload!</Text>
                        <Link href={'/'}>
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M10.5 0.34375C7.375 0.34375 4.5625 1.74939 2.6875 4.01501V1.125H1.125V7.375H7.375V5.8125H3.31311C4.87561 3.46875 7.45312 1.90625 10.5 1.90625C15.2656 1.90625 19.0938 5.73438 19.0938 10.5C19.0938 15.2656 15.2656 19.0938 10.5 19.0938C5.73438 19.0938 1.90625 15.2656 1.90625 10.5H0.34375C0.34375 16.125 4.875 20.6562 10.5 20.6562C16.125 20.6562 20.6562 16.125 20.6562 10.5C20.6562 4.875 16.125 0.34375 10.5 0.34375Z"
                                    fill="black"/>
                            </svg>
                        </Link>
                    </Flex>}
                </Flex>
            </main>
        </>
    );
};

export default Layout;

import React from 'react';
import {Flex, Image} from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import RightContent from "./RightContent/RightContent";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from '../../firebase/client';
import Directory from "./Directory/Directory";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
    const [user, userLoading, userError] = useAuthState(auth);
    return (
        <Flex bg={'white'} height={'44px'} padding={'6px 12px'} justify={{md: 'space-between'}}>
            <Flex align={'center'} width={{base: '40px', md: 'auto'}} mr={{base: 0, md: 2}}>
                <Image
                    src={'/images/redditFace.svg'}
                    height={'30px'}
                    alt={'reddit-face'}/>
                <Image
                    src={'/images/redditText.svg'}
                    height={'46px'}
                    alt={'reddit-text'}
                    display={{
                        base: 'none',
                        md: 'unset'
                    }}/>
            </Flex>
            {user && <Directory/>}
            <SearchInput user={user}/>
            <RightContent user={user}/>
        </Flex>
    );
};

export default Navbar;

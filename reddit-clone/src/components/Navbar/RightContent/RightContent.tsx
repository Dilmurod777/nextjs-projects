import React from 'react';
import {Button, Flex, Text} from "@chakra-ui/react";
import AuthButtons from "./AuthButtons";
import AuthModal from "../../Modal/Auth/AuthModal";
import {User} from "@firebase/auth";
import Icons from "./Icons";
import UserMenu from "./UserMenu";

type RightContentProps = {
    user: User | null | undefined;
};

const RightContent: React.FC<RightContentProps> = ({user}) => {
    return (
        <>
            <AuthModal/>
            <Flex justify={'center'} align={'center'}>
                {user
                    ? <Icons/>
                    : <AuthButtons/>}
                <UserMenu user={user}/>
            </Flex>
        </>
    );
};

export default RightContent;

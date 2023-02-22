import React from 'react';
import {Flex} from "@chakra-ui/react";
import {authModalState} from "../../../atoms/authModalAtom";
import {useRecoilValue} from "recoil";
import Login from "./Login";
import SignUp from "./SignUp";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = (props) => {
    const authModelState = useRecoilValue(authModalState);

    return (
        <Flex
            direction={'column'}
            align={'center'}
            width={'100%'}
            mt={4}
        >
            {authModelState.view === 'login' && <Login/>}
            {authModelState.view === 'signup' && <SignUp/>}
        </Flex>
    );
};

export default AuthInputs;

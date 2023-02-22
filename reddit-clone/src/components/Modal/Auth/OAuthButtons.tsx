import React, {useEffect} from 'react';
import {Button, Flex, Image, Text} from "@chakra-ui/react";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import {auth} from '../../../firebase/client';
import {GetFirebaseAuthError} from "../../../firebase/errors";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
    const [signInWithGoogle, user, userLoading, userError] = useSignInWithGoogle(auth);

    useEffect(() => {
        console.log(userError)
    }, [userError])

    return (
        <Flex direction={'column'} width={'100%'} mb={4}>
            <Button variant={'oauth'} mb={2} isLoading={userLoading} onClick={() => signInWithGoogle()}>
                <Image
                    src={'/images/googlelogo.png'}
                    alt={'googlelogo'}
                    height={'20px'}
                    mr={4}
                />
                Continue with Google
            </Button>
            <Button variant={'oauth'} mb={2}>
                Some other OAuth provider
            </Button>
            {userError && <Text>{GetFirebaseAuthError(userError)}</Text>}
        </Flex>
    );
};

export default OAuthButtons;

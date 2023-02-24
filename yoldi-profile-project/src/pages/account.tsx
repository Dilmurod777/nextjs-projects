import React, {useEffect} from 'react';
import {Button, Flex} from "@chakra-ui/react";
import {auth} from "@/utils/firebase";
import {useUser} from "@/utils/swr";
import {Router, useRouter} from "next/router";

type AccountProps = {};

const Account: React.FC<AccountProps> = (props) => {
    const {user, isLoading} = useUser()
    const router = useRouter()

    useEffect(() => {
        if(!user){
            router.replace('/auth')
                .then()
        }
    }, [user]);


    return (
        <Flex w={'100%'} alignItems={'center'} justifyContent={'center'}>
            <Button
                isLoading={isLoading}
                onClick={async () => await fetch('/api/logout')}
            >Выйти</Button>
        </Flex>
    );
};

export default Account;

import React from 'react';
import {Button, Flex} from "@chakra-ui/react";
import {auth} from "@/utils/firebase";

type AccountProps = {};

const Account: React.FC<AccountProps> = (props) => {
    return (
        <Flex w={'100%'} alignItems={'center'} justifyContent={'center'}>
            <Button
                onClick={async () => await fetch('/api/logout')}
            >Выйти</Button>
        </Flex>
    );
};

export default Account;

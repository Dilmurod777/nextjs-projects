import {Flex, Spinner} from "@chakra-ui/react";
import React, {useEffect} from "react";
import {useRouter} from "next/router";

export default function Home() {
    const router = useRouter()

    useEffect(() => {
        const email = localStorage.getItem('email')
        if (email) {
            router.push('/account')
                .then()
        } else {
            router.push('/auth')
                .then()
        }
    }, [])

    return <Flex w={'100%'} height={'calc(100vh - 80px)'} justifyContent={'center'} alignItems={'center'}>
        <Spinner color={'#000000'} h={'40px'} w={'40px'}/>
    </Flex>
}

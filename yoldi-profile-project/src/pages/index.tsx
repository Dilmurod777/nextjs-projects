import {Flex, Spinner} from "@chakra-ui/react";
import {useUser} from "@/utils/swr";
import {useEffect} from "react";
import {Router, useRouter} from "next/router";

export default function Home() {
    const {user, isLoading} = useUser()
    const router = useRouter()

    useEffect(() => {
        console.log('home user', user)
        if (user) {
            router.push('/account')
                .then()
        } else {
            router.push('/auth')
                .then()
        }
    }, [user, isLoading])
}

import {Flex, Spinner} from "@chakra-ui/react";
import Auth from "@/components/Auth/Auth";
import {useUser} from "@/utils/swr";
import Account from "@/components/Account/Account";

export default function Home() {
    const {user, isLoading, isError} = useUser()

    return (
        <Flex bgColor={'#f3f3f3'} h={'calc(100vh - 80px)'} w={'100%'}>
            {isLoading && <Flex w={'100%'} justifyContent={'center'} alignItems={'center'}>
                <Spinner color={'#000000'} h={'40px'} w={'40px'}/>
            </Flex>}
            {!isLoading && !user && <Auth/>}
            {!isLoading && user && <Account/>}
        </Flex>
    )
}

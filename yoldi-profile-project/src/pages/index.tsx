import {Flex} from "@chakra-ui/react";
import Auth from "@/components/Auth/Auth";

export default function Home() {
    return (
        <Flex bgColor={'gray'} h={'calc(100vh - 80px)'}>
            <Auth/>
        </Flex>
    )
}

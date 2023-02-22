import {Flex} from "@chakra-ui/react";
import User from "@/models/User";
import Account from "@/components/Account/Account";
import Auth from "@/components/Auth/Auth";

export default function Home() {
    const user = User.getUser();

    return (
        <Flex bgColor={'gray'} h={'calc(100vh - 80px)'}>
            {user
                ? <Account/>
                : <Auth/>
            }
        </Flex>
    )
}

import React, {useEffect, useState} from 'react';
import {Flex, Text} from "@chakra-ui/react";
import Image from "next/image";
import {useUser} from "@/utils/swr";
import {useRouter} from "next/router";
import {useEmailContext} from "@/utils/hooks";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
    const email = useEmailContext();
    const {user} = useUser(email);
    const router = useRouter();

    return (
        <Flex
            h={'80px'}
            w={'100%'}
            bgColor={'#ffffff'}
            alignItems={'center'}
            justifyContent={'space-between'}
            p={'0 29.5px 0 20px'}
            borderBottom={'1px solid #e6e6e6'}
        >
            <Flex>
                <svg width="80" height="50" viewBox="0 0 80 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="80" height="50" fill="#FEFF80"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M14.4872 34.2064C14.0662 34.2064 13.8288 33.978 13.8288 33.5713V26.4242L8.34977 17.1905C8.08553 16.7336 8.29603 16.4286 8.79616 16.4286H12.1687C12.5374 16.4286 12.7748 16.5818 12.9316 16.8854L15.9368 22.4307L18.9391 16.8854C19.0959 16.5818 19.3332 16.4286 19.702 16.4286H23.0745C23.5747 16.4286 23.7852 16.7336 23.5224 17.1905L18.0434 26.4242V34.1902"
                          fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M67.9146 33.571V22.1433C67.9146 21.736 68.1456 21.508 68.5565 21.508H71.1228C71.5338 21.508 71.7648 21.736 71.7648 22.1433V33.571C71.7648 33.9768 71.5338 34.2064 71.1228 34.2064H68.5565C68.1456 34.2064 67.9146 33.9768 67.9146 33.571Z"
                          fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M31.8332 28.4937C31.8332 26.7868 30.5001 25.6557 28.7685 25.6557C27.0368 25.6557 25.7052 26.7868 25.7052 28.4937C25.7052 30.2006 27.0368 31.3301 28.7685 31.3301C30.5001 31.3301 31.8332 30.2006 31.8332 28.4937ZM21.7111 28.4937C21.7111 24.9101 24.8526 22.143 28.7691 22.143C32.6857 22.143 35.8286 24.9101 35.8286 28.4937C35.8286 32.0773 32.6857 34.8414 28.7691 34.8414C24.8526 34.8414 21.7111 32.0773 21.7111 28.4937Z"
                          fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M39.6792 34.2064V17.0821C39.6792 16.6646 39.911 16.4286 40.3207 16.4286H42.8866C43.2976 16.4286 43.5294 16.6646 43.5294 17.0821V33.5573C43.5294 33.9718 43.2976 34.2064 42.8866 34.2064"
                          fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M60.0498 25.3183C60.0498 22.2701 58.0685 20.3382 55.2015 20.3382H51.5508V30.2955H55.2015C58.0685 30.2955 60.0498 28.3636 60.0498 25.3183ZM55.2015 16.4286C60.2317 16.4286 64.0642 20.2879 64.0642 25.3182C64.0642 30.3456 60.2317 34.2064 55.2015 34.2064H48.6839H48.0318C47.6134 34.2064 47.3798 33.9763 47.3798 33.5723V17.0627C47.3798 16.6572 47.6134 16.4286 48.0318 16.4286"
                          fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M67.9146 18.9287V17.1031C67.9146 16.6707 68.1456 16.4286 68.5565 16.4286H71.1228C71.5338 16.4286 71.7648 16.6707 71.7648 17.1031V18.9287C71.7648 19.3595 71.5338 19.6032 71.1228 19.6032H68.5565C68.1456 19.6032 67.9146 19.3595 67.9146 18.9287Z"
                          fill="black"/>
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M26.8438 18.9287V17.1031C26.8438 16.6707 27.0776 16.4286 27.4936 16.4286H35.1778C35.5938 16.4286 35.8277 16.6707 35.8277 17.1031V18.9287C35.8277 19.3595 35.5938 19.6032 35.1778 19.6032H27.4936C27.0776 19.6032 26.8438 19.3595 26.8438 18.9287Z"
                          fill="black"/>
                </svg>
                <Text w={'225px'} ml={"20px"} fontWeight={400} display={{base: 'none', md: 'inline-block'}}>
                    Разрабатываем и запускаем сложные веб проекты
                </Text>
            </Flex>
            {user
                ? <Flex alignItems={'center'}>
                    <Text>{user?.name}</Text>
                    <Flex borderRadius={'50%'} overflow={'hidden'} ml={'20px'} bgColor={'#E6E6E6'} w={'50px'} h={'50px'} alignItems={'center'}
                          justifyContent={'center'}>
                        {user?.imageUrl
                            ? <Image src={user?.imageUrl} alt={'avatar'} width={50} height={50}/>
                            : <Text fontWeight={400} lineHeight={'25.2px'} fontSize={'18px'}>{user?.name[0]}</Text>
                        }
                    </Flex>
                </Flex>
                : <Text
                    p={'7px 33px'}
                    border={'1px solid'}
                    borderColor={'#d4d4d4'}
                    borderRadius={'5px'}
                    cursor={'pointer'}
                    onClick={() => router.replace('/auth').then()}
                >
                    Войти
                </Text>}
        </Flex>
    );
};

export default Header;

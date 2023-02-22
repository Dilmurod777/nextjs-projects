import React, {useState} from 'react';
import {Flex, Text} from "@chakra-ui/react";

type AuthProps = {};

enum AuthPage {Register, Login}

const Auth: React.FC<AuthProps> = () => {
    const [authPage, setAuthPage] = useState(AuthPage.Register)

    return (
        <Flex flexDirection={'column'} w={'100%'}>
            <Flex flexGrow={1} alignItems={'center'} justifyContent={'center'}>
                <Flex
                    flexDirection={'column'}
                    bgColor={'#ffffff'}
                    width={{base: '100%', sm: '400px'}}
                    h={{base: '100%', sm: 'auto'}}
                    p={'30px'}
                    border={{base: 'none', sm: '1px solid'}}
                    borderColor={{base: 'transparent', sm: '#E6E6E6'}}
                    borderRadius={{base: 0, sm: '5px'}}
                >
                    <Text
                        fontSize={'30px'}
                        lineHeight={'140%'}
                        whiteSpace={'pre'}
                    >
                        {authPage === AuthPage.Register ? 'Регистрация\n в Yoldi Agency' : 'Вход в Yoldi Agency'}
                    </Text>
                </Flex>
            </Flex>
            <Flex h={'72px'} w={'100%'} bgColor={'#ffffff'} alignItems={'center'} justifyContent={'center'} borderTop={'1px solid #E6E6E6'}>
                <Text
                    fontWeight={400}
                    color={'#838383'}
                >{authPage === AuthPage.Register ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'} <Text
                    fontWeight={500}
                    color={'#000000'}
                    display={'inline'}
                    cursor={'pointer'}
                    onClick={() => {setAuthPage(authPage === AuthPage.Register ? AuthPage.Login : AuthPage.Register)}}
                >{authPage === AuthPage.Register ? 'Войти' : 'Зарегистрироваться'}</Text>
                </Text>
            </Flex>
        </Flex>
    );
};

export default Auth;

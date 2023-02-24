import React, {useEffect, useRef, useState} from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import InputField from "@/components/Auth/InputField";
import SubmitButton from "@/components/Auth/SubmitButton";
import {UserResponseData} from "@/utils/api";
import {useRouter} from "next/router";

type AuthProps = {};

enum AuthPage {Register, Login}

const Auth: React.FC<AuthProps> = () => {
    const router = useRouter()
    const [authPage, setAuthPage] = useState(AuthPage.Register)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [passwordType, setPasswordType] = useState('password');
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const isFormValid = (): boolean => {
        if (authPage === AuthPage.Register) {
            if (formData.name.trim().length < 1) {
                return false;
            }
        }

        const regex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
        if (!regex.test(formData.email)) {
            return false;
        }

        if (formData.password.trim().length < 6) {
            return false;
        }

        return true;
    }

    const togglePasswordVisibility = () => {
        if (formData.password.length === 0) return

        setPasswordType(passwordType === 'password' ? 'text' : 'password')
    }

    const inputFieldChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const submitHandler = async () => {
        try {
            setLoading(true);
            setError('')

            let response: Response;
            if (authPage === AuthPage.Register) {
                response = await fetch(`/api/signup/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
            } else {
                response = await fetch(`/api/login/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
            }

            const json: UserResponseData = await response.json();

            if (json.status === 'ok') {
                console.log('submitHandler success', json.data)
                localStorage.setItem('email', formData.email);
                router.replace('/account')
                    .then()
            } else if (json.status === 'not_ok') {
                setError(json.data as string);
            }
        } catch (e) {
            console.log('submitHandler error', e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Flex flexDirection={'column'} h={'100%'} justifyContent={'space-between'} flexGrow={1}>
            <Flex flexGrow={1} height={'calc(100vh - 80px - 72px)'} alignItems={'center'} justifyContent={'center'}>
                <Flex
                    flexDirection={'column'}
                    bgColor={'#ffffff'}
                    w={{base: '100%', sm: '400px'}}
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
                        mb={'25px'}
                    >
                        {authPage === AuthPage.Register ? 'Регистрация\nв Yoldi Agency' : 'Вход в Yoldi Agency'}
                    </Text>
                    <Flex flexDirection={'column'} gap={'15px'}>
                        {authPage === AuthPage.Register && (
                            <InputField
                                name={'name'}
                                type={'text'}
                                placeholder={'Имя'}
                                onChange={inputFieldChangeHandler}
                                leadingIcon={(
                                    <Box position={'absolute'} zIndex={100} transform={'translateY(-50%)'} top={'50%'} left={'24.69px'}>
                                        <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M8.5 0.90625C5.48792 0.90625 3.03125 3.36291 3.03125 6.375C3.03125 8.25793 3.99255 9.9303 5.44824 10.916C2.66199 12.1123 0.6875 14.8772 0.6875 18.0938H2.25C2.25 14.6331 5.03931 11.8438 8.5 11.8438C11.9607 11.8438 14.75 14.6331 14.75 18.0938H16.3125C16.3125 14.8772 14.338 12.1123 11.5518 10.916C13.0074 9.9303 13.9688 8.25793 13.9688 6.375C13.9688 3.36291 11.5121 0.90625 8.5 0.90625ZM8.5 2.46875C10.6667 2.46875 12.4062 4.20825 12.4062 6.375C12.4062 8.54175 10.6667 10.2812 8.5 10.2812C6.33325 10.2812 4.59375 8.54175 4.59375 6.375C4.59375 4.20825 6.33325 2.46875 8.5 2.46875Z"
                                                fill="black"/>
                                        </svg>
                                    </Box>
                                )}
                            />
                        )}
                        <InputField
                            name={'email'}
                            type={'email'}
                            placeholder={'E-mail'}
                            onChange={inputFieldChangeHandler}
                            leadingIcon={(
                                <Box position={'absolute'} zIndex={100} transform={'translateY(-50%)'} top={'50%'} left={'22.34px'}>
                                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M0.34375 0.25V14.3125H20.6562V0.25H0.34375ZM3.71289 1.8125H17.2871L10.5 6.3291L3.71289 1.8125ZM1.90625 2.49609L10.0605 7.94043L10.5 8.20898L10.9395 7.94043L19.0938 2.49609V12.75H1.90625V2.49609Z"
                                            fill="black"/>
                                    </svg>
                                </Box>
                            )}
                        />
                        <InputField
                            name={'password'}
                            type={passwordType}
                            placeholder={'Пароль'}
                            onChange={inputFieldChangeHandler}
                            leadingIcon={(
                                <Box position={'absolute'} zIndex={100} transform={'translateY(-50%)'} top={'50%'} left={'24.69px'}>
                                    <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M8.5 0.34375C5.49707 0.34375 3.03125 2.80957 3.03125 5.8125V8.15625H0.6875V20.6562H16.3125V8.15625H13.9688V5.8125C13.9688 2.80957 11.5029 0.34375 8.5 0.34375ZM8.5 1.90625C10.6515 1.90625 12.4062 3.66101 12.4062 5.8125V8.15625H4.59375V5.8125C4.59375 3.66101 6.34851 1.90625 8.5 1.90625ZM2.25 9.71875H14.75V19.0938H2.25V9.71875Z"
                                            fill="black"/>
                                    </svg>
                                </Box>
                            )}
                            trailingIcon={(
                                <Box
                                    position={'absolute'}
                                    zIndex={100}
                                    transform={'translateY(-50%)'}
                                    top={'50%'}
                                    right={'20.51px'}
                                    cursor={'pointer'}
                                    onClick={togglePasswordVisibility}
                                >
                                    <svg width="25" height="13" viewBox="0 0 25 13"
                                         fill={`${passwordType === 'password' && formData.password.length > 0 ? '#000000' : '#838383'}`}
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M12.5 0.25C5.98755 0.25 0.976562 5.9873 0.976562 5.9873L0.512695 6.5L0.976562 7.0127C0.976562 7.0127 5.54504 12.222 11.6211 12.7012C11.911 12.7378 12.2009 12.75 12.5 12.75C12.7991 12.75 13.089 12.7378 13.3789 12.7012C19.455 12.222 24.0234 7.0127 24.0234 7.0127L24.4873 6.5L24.0234 5.9873C24.0234 5.9873 19.0125 0.25 12.5 0.25ZM12.5 1.8125C14.2212 1.8125 15.8081 2.28247 17.1875 2.91113C17.6849 3.73511 17.9688 4.6842 17.9688 5.71875C17.9688 8.54163 15.8508 10.861 13.1104 11.1631C13.0951 11.1661 13.0768 11.16 13.0615 11.1631C12.8754 11.1722 12.6892 11.1875 12.5 11.1875C12.2925 11.1875 12.0911 11.1753 11.8896 11.1631C9.14917 10.861 7.03125 8.54163 7.03125 5.71875C7.03125 4.69946 7.30591 3.75037 7.78809 2.93555H7.76367C9.15527 2.29468 10.7605 1.8125 12.5 1.8125ZM12.5 3.375C11.2061 3.375 10.1562 4.4248 10.1562 5.71875C10.1562 7.0127 11.2061 8.0625 12.5 8.0625C13.7939 8.0625 14.8438 7.0127 14.8438 5.71875C14.8438 4.4248 13.7939 3.375 12.5 3.375ZM5.66406 4.10742C5.54199 4.63232 5.46875 5.16028 5.46875 5.71875C5.46875 7.08899 5.85938 8.37073 6.54297 9.4541C4.57458 8.3158 3.2074 6.95776 2.75879 6.5C3.13416 6.11548 4.18091 5.09619 5.66406 4.10742ZM19.3359 4.10742C20.8191 5.09619 21.8658 6.11548 22.2412 6.5C21.7926 6.95776 20.4254 8.3158 18.457 9.4541C19.1406 8.37073 19.5312 7.08899 19.5312 5.71875C19.5312 5.16028 19.458 4.62622 19.3359 4.10742Z"/>
                                    </svg>
                                </Box>
                            )}
                        />
                    </Flex>

                    <Text
                        fontSize={'12px'}
                        fontWeight={400}
                        color={'#ff0000'}
                        textAlign={'center'}
                        w={'100%'}
                        textOverflow={'ellipsis'}
                    >{error}</Text>

                    <SubmitButton
                        isLoading={loading}
                        active={isFormValid()}
                        text={authPage === AuthPage.Register ? 'Создать аккаунт' : 'Войти'}
                        onSubmit={submitHandler}
                    />
                </Flex>
            </Flex>
            <Flex h={'72px'} w={'100%'} bgColor={'#ffffff'} alignItems={'center'} justifyContent={'center'} borderTop={'1px solid #E6E6E6'}>
                <Text
                    fontWeight={400}
                    color={'#838383'}
                    mr={1}
                >{authPage === AuthPage.Register ? 'Уже есть аккаунт?' : 'Еще нет аккаунта?'}
                </Text>
                <Text
                    fontWeight={500}
                    color={'#000000'}
                    display={'inline'}
                    cursor={'pointer'}
                    onClick={() => {setAuthPage(authPage === AuthPage.Register ? AuthPage.Login : AuthPage.Register)}}
                >{authPage === AuthPage.Register ? 'Войти' : 'Зарегистрироваться'}</Text>
            </Flex>
        </Flex>
    );
};

export default Auth;

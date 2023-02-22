import React, {useEffect, useState} from 'react';
import {Button, Flex, Input, Text} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/client";
import {GetFirebaseAuthError} from "../../../firebase/errors";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })
    const setAuthModalState = useSetRecoilState(authModalState);
    const [signInWithEmailAndPassword, user, userLoading, userError] = useSignInWithEmailAndPassword(auth);
    const [formError, setFormError] = useState('');

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (loginForm.email && loginForm.password) {
            signInWithEmailAndPassword(loginForm.email, loginForm.password)
                .then(() => {})
                .catch(() => {})
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        setFormError(GetFirebaseAuthError(userError));
    }, [userError])

    return (
        <form onSubmit={handleFormSubmit}>
            <Input
                required
                name={'email'}
                placeholder={'email'}
                type={'email'}
                onChange={handleInputChange}
                mb={2}
                fontSize={'10pt'}
                _placeholder={{color: 'gray.500'}}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
            />
            <Input
                required
                name={'password'}
                placeholder={'password'}
                type={'password'}
                onChange={handleInputChange}
                mb={2}
                fontSize={'10pt'}
                _placeholder={{color: 'gray.500'}}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
            />
            {formError && <Text textAlign={'center'} color={'red'} fontSize={'10pt'}>{formError}</Text>}
            <Button
                type={'submit'}
                width={'100%'}
                height={'36px'}
                mt={2}
                mb={2}
                isLoading={userLoading}
            >Log In</Button>

            <Flex justifyContent={'center'} mb={2}>
                <Text fontSize={'9pt'} mr={1}>Forgot your password?</Text>
                <Text
                    fontSize={'9pt'}
                    color={'blue.500'}
                    cursor={'pointer'}
                    onClick={() => setAuthModalState(prev => ({
                        ...prev,
                        view: 'resetPassword'
                    }))}
                >Reset</Text>
            </Flex>

            <Flex
                fontSize={'9pt'}
                justifyContent={'center'}
            >
                <Text mr={1}>New to Reddit?</Text>
                <Text
                    color={'blue.500'}
                    fontWeight={'700'}
                    cursor={'pointer'}
                    onClick={() => setAuthModalState(prev => ({
                        ...prev,
                        view: 'signup'
                    }))}
                >SIGN UP</Text>
            </Flex>
        </form>
    );
};

export default Login;

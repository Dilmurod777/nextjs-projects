import React, {useEffect, useState} from 'react';
import {useSetRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import {Button, Flex, Input, Text} from "@chakra-ui/react";
import {useCreateUserWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/client";
import {FIREBASE_AUTH_ERRORS, GetFirebaseAuthError} from "../../../firebase/errors";

type SignUpProps = {};

const SignUp: React.FC<SignUpProps> = () => {
    const [signUpForm, setSignUpForm] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const setAuthModalState = useSetRecoilState(authModalState);
    const [createUserWithEmailAndPassword, user, userLoading, userError] = useCreateUserWithEmailAndPassword(auth);
    const [formError, setFormError] = useState('');

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formError) setFormError('');

        if (signUpForm.password !== signUpForm.confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }

        createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
            .then(() => {
            })
            .catch((error) => {
                setFormError(error.message)
            });
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpForm({
            ...signUpForm,
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
            <Input
                required
                name={'confirmPassword'}
                placeholder={'confirm password'}
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
                bg={'gray.50'}
            />
            {formError && <Text textAlign={'center'} color={'red'} fontSize={'10pt'}>{formError}</Text>}
            <Button
                type={'submit'}
                width={'100%'}
                height={'36px'}
                mt={2}
                mb={2}
                isLoading={userLoading}
            >Sign Up</Button>

            <Flex
                fontSize={'9pt'}
                justifyContent={'center'}
            >
                <Text mr={1}>Already a redditor?</Text>
                <Text
                    color={'blue.500'}
                    fontWeight={'700'}
                    cursor={'pointer'}
                    onClick={() => setAuthModalState(prev => ({
                        ...prev,
                        view: 'login'
                    }))}
                >LOGIN</Text>
            </Flex>
        </form>
    );
};

export default SignUp;

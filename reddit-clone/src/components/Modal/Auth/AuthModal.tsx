import React, {useEffect} from 'react';
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/modal";
import {Flex, Text} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {authModalState} from "../../../atoms/authModalAtom";
import AuthInputs from "./AuthInputs";
import OAuthButtons from "./OAuthButtons";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../../firebase/client";
import ResetPassword from "./ResetPassword";

type AuthModalProps = {};

const AuthModal: React.FC<AuthModalProps> = () => {
    const [modalState, setModalState] = useRecoilState(authModalState);
    const [user, userLoading, userError] = useAuthState(auth);

    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false
        }))
    }

    useEffect(() => {
        console.log(user)
        if (user) {
            handleClose();
        }
    }, [user])


    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader textAlign={'center'}>
                        {modalState.view === 'login' && 'Log In'}
                        {modalState.view === 'signup' && 'Sign Up'}
                        {modalState.view === 'resetPassword' && 'Reset Password'}
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        pb={6}
                    >
                        <Flex
                            direction={'column'}
                            align={'center'}
                            justify={'center'}
                            width={'70%'}
                        >
                            {
                                modalState.view === 'login' || modalState.view === 'signup'
                                    ?
                                    <>
                                        <OAuthButtons/>
                                        <Text color={'gray.500'} fontWeight={700}>OR</Text>
                                        <AuthInputs/>
                                    </>
                                    : <ResetPassword/>
                            }

                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AuthModal;

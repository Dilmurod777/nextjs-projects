import React, {useState} from 'react';
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay} from "@chakra-ui/modal";
import {Box, Button, Checkbox, Divider, Flex, Icon, Input, Stack, Text} from "@chakra-ui/react";
import {BsFillEyeFill, BsFillPersonFill} from "react-icons/bs";
import {HiLockClosed} from "react-icons/hi";
import {auth, firestore} from "../../../firebase/client";
import {doc, DocumentReference, getDoc, runTransaction, serverTimestamp, setDoc} from "@firebase/firestore";
import {useAuthState} from "react-firebase-hooks/auth";


type CreateCommunityModalProps = {
    open: boolean;
    handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({open, handleClose}) => {
    const [user] = useAuthState(auth);
    const [communityName, setCommunityName] = useState('');
    const [charsRemaining, setCharsRemaining] = useState(21);
    const [communityType, setCommunityType] = useState('public');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const COMMUNITY_TYPES = [
        {name: 'public', icon: BsFillPersonFill, label: 'Public', description: 'Anyone can view, post, and comment to this community.'},
        {
            name: 'restricted',
            icon: BsFillEyeFill,
            label: 'Restricted',
            description: 'Anyone can view this community but only approved users can post.'
        },
        {name: 'private', icon: HiLockClosed, label: 'Private', description: 'Only approved users can view and submit to this community.'},
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 21) {
            return
        }
        setCommunityName(e.target.value);
        setCharsRemaining(21 - e.target.value.length);
    }

    const handleCommunityTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommunityType(e.target.name);
    }

    const validateCommunityName = () => {
        const regex = /[!\s@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/
        if (regex.test(communityName) || communityName.length < 3) {
            throw new Error("Community names must be between 3-21 characters and can only contain letters, numbers, or underscores.")
        }
    }

    const checkIfCommunityExists = async (communityDocRef: DocumentReference) => {
        const communityDoc = await getDoc(communityDocRef);
        if (communityDoc.exists()) {
            throw new Error(`Sorry, r/${communityName} is already taken. Try another.`)
        }
    }

    const handleCreateCommunity = async () => {
        if (error) setError('');
        try {
            validateCommunityName();
            setLoading(true);

            const communityDocRef = doc(firestore, "communities", communityName);

            await runTransaction(firestore, async (transaction) => {
                await checkIfCommunityExists(communityDocRef);

                transaction.set(communityDocRef, {
                    creatorId: user?.uid,
                    createdAt: serverTimestamp(),
                    numberOfMembers: 1,
                    privacyType: communityType
                });

                transaction.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityName), {
                    communityId: communityName,
                    isModerator: true
                })
            })
        } catch (error: any) {
            console.log("handleCreateCommunity error", error.message)
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <Modal isOpen={open} onClose={handleClose} size={'lg'}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader
                        display={'flex'}
                        flexDirection={'column'}
                        fontSize={15}
                        padding={3}
                    >Create a community</ModalHeader>
                    <Box pl={3} pr={3}>
                        <Divider/>
                        <ModalCloseButton/>
                        <ModalBody
                            display={'flex'}
                            flexDirection={'column'}
                            padding={'10px 0px'}
                        >
                            <Text fontWeight={600} fontSize={15}>Name</Text>
                            <Text fontSize={11} color={'gray.500'}>Community names including capitalization cannot be changed</Text>
                            <Text position={'relative'} top={'28px'} left={'10px'} width={'20px'} color={'gray.400'}>r/</Text>
                            <Input
                                position={'relative'}
                                value={communityName}
                                pl={'22px'}
                                size={'sm'}
                                onChange={handleChange}
                            />
                            <Text
                                color={charsRemaining === 0 ? 'red' : 'gray.500'}
                                fontSize={'9pt'}
                            >{charsRemaining} characters remaining</Text>
                            <Text fontSize={'9pt'} color={'red'} pt={1}>{error}</Text>

                            <Box mt={4} mb={4}>
                                <Text fontWeight={600} fontSize={15}>
                                    Community Type
                                </Text>
                                <Stack spacing={2}>
                                    {COMMUNITY_TYPES.map((type, index) => {
                                        return (
                                            <Checkbox
                                                key={index}
                                                name={type.name}
                                                isChecked={communityType === type.name}
                                                onChange={handleCommunityTypeChange}
                                            >
                                                <Flex align={'center'}>
                                                    <Icon as={type.icon} color={'gray.500'} mr={2}/>
                                                    <Text
                                                        fontSize={'10pt'}
                                                        mr={1}
                                                    >{type.label}</Text>
                                                    <Text fontSize={'8pt'} color={'gray.500'}>
                                                        {type.description}
                                                    </Text>
                                                </Flex>
                                            </Checkbox>
                                        )
                                    })}
                                </Stack>
                            </Box>
                        </ModalBody>
                    </Box>

                    <ModalFooter bg={'gray.100'} borderRadius={'0 0 10px 10px'}>
                        <Button variant={'outline'} height={'30px'} mr={3} onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button height={'30px'} onClick={handleCreateCommunity} isLoading={loading}>Create community</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};

export default CreateCommunityModal;

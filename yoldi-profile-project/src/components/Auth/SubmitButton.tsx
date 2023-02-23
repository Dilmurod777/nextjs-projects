import React from 'react';
import {Button, Flex, Spinner, Text} from "@chakra-ui/react";

type SubmitButtonProps = {
    active: boolean;
    text: string;
    isLoading: boolean;
    onSubmit: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({active, isLoading, text, onSubmit}) => {
    return (
        <Button
            h={'50px'}
            w={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={'25px'}
            bgColor={active ? '#000000' : '#D4D4D4'}
            borderRadius={'5px'}
            cursor={active ? 'pointer' : 'not-allowed'}
            onClick={onSubmit}
            transition={'all 0.25s'}
            isLoading={isLoading}
            spinner={<Spinner color={active ? '#ffffff' : '#000000'}/>}
            _hover={{}}
        >
            <Text
                color={active ? '#ffffff' : '#F3F3F3'}
                transition={'all 0.25s'}
            >
                {text}
            </Text>
        </Button>
    );
};

export default SubmitButton;

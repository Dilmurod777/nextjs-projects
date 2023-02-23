import React from 'react';
import {Flex, Text} from "@chakra-ui/react";

type SubmitButtonProps = {
    active: boolean;
    text: string;
    onSubmit: () => void;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({active, text, onSubmit}) => {
    return (
        <Flex
            h={'50px'}
            w={'100%'}
            justifyContent={'center'}
            alignItems={'center'}
            mt={'25px'}
            bgColor={active?'#000000' :'#D4D4D4'}
            borderRadius={'5px'}
            cursor={'pointer'}
            onClick={onSubmit}
            transition={'all 0.25s'}
        >
            <Text
                color={active ? '#ffffff' :'#F3F3F3'}
                transition={'all 0.25s'}
            >
                {text}
            </Text>
        </Flex>
    );
};

export default SubmitButton;

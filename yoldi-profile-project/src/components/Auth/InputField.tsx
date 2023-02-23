import React, {ReactElement, RefObject} from 'react';
import {Box, Flex, Input} from "@chakra-ui/react";

type InputFieldProps = {
    name: string;
    type: string;
    placeholder: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    leadingIcon: ReactElement;
    trailingIcon?: ReactElement;
    inputRef?: RefObject<HTMLInputElement>;
};

const InputField: React.FC<InputFieldProps> = ({name, type, placeholder, onChange, leadingIcon, trailingIcon, inputRef}) => {
    return (
        <Box
            position={'relative'}
            h={'50px'}
            w={{base: '100%', sm: '330px'}}
            m={{base: 0, sm: '0 5px'}}
        >
            {leadingIcon}
            <Input
                ref={inputRef}
                type={type}
                name={name}
                placeholder={placeholder}
                _placeholder={{fontWeight: 400, color: '#838383'}}
                h={'50px'}
                padding={`12px ${trailingIcon ? '55px' : '20px'} 12px 55px`}
                color={'#000000'}
                fontWeight={400}
                onChange={onChange}
                border={'1px solid'}
                borderColor={'#D5D5D5'}
                borderRadius={'5px'}
                outline={'none'}
                _hover={{outline: 'none', borderColor: '#838383'}}
                _focus={{outline: 'none', borderColor: '#838383'}}
                _focusVisible={{outline: 'none', borderColor: '#838383'}}
            />
            {trailingIcon}
        </Box>
    );
};

export default InputField;

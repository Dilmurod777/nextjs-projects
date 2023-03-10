import React from 'react';
import {Flex, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";
import {User} from "@firebase/auth";

type SearchInputProps = {
    user: User | null | undefined;
};

const SearchInput: React.FC<SearchInputProps> = ({user}) => {
    return (
        <Flex flexGrow={1} mr={2} align={'center'} maxWidth={user ? 'auto' : '600px'}>
            <InputGroup size='sm'>
                <InputLeftElement pointerEvents={'none'}>
                    <SearchIcon color={'gray.400'}/>
                </InputLeftElement>
                <Input
                    type='text'
                    placeholder='Search Reddit'
                    fontSize={'10pt'}
                    height={'34px'}
                    bg={'gray.50'}
                    _placeholder={{color: 'gray.500'}}
                    _hover={{
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'blue.500'
                    }}
                    _focus={{
                        outline: 'none',
                        border: '1px solid',
                        borderColor: 'blue.500'
                    }}/>
            </InputGroup>
        </Flex>
    );
};

export default SearchInput;

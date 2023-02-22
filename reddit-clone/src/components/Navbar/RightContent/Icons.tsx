import React from 'react';
import {BsArrowUpRightCircle, BsChatDots, BsInfoCircleFill} from "react-icons/bs";
import {GrAdd} from 'react-icons/gr';
import {IoFilterCircleOutline, IoNotificationsOutline, IoVideocamOutline} from "react-icons/io5";
import {Flex, Icon} from "@chakra-ui/react";

type IconsProps = {};

const Icons: React.FC<IconsProps> = () => {
    const RenderIcon = ({
        icon = BsInfoCircleFill,
        mr = 1.5,
        ml = 1.5,
        padding = 1,
        cursor = 'pointer',
        borderRadius = 4,
        fontSize = 20,
        _hover = {bg: 'gray.200'},
        display = {base: 'flex', md: 'flex'}
    }) => {
        return <Flex
            display={display}
            mr={mr}
            ml={ml}
            align={'center'}
            padding={padding}
            cursor={cursor}
            borderRadius={borderRadius}
            _hover={_hover}
        >
            <Icon fontSize={fontSize} as={icon}/>
        </Flex>;
    }

    return (
        <Flex>
            <Flex
                display={{base: 'none', md: 'flex'}}
                borderRight={'1px solid'}
                borderColor={'gray.200'}
            >
                {RenderIcon({icon: BsArrowUpRightCircle, fontSize: 20})}
                {RenderIcon({icon: IoFilterCircleOutline, fontSize: 22})}
                {RenderIcon({icon: IoVideocamOutline, fontSize: 22})}
            </Flex>
            <>
                {RenderIcon({icon: BsChatDots, fontSize: 20})}
                {RenderIcon({icon: IoNotificationsOutline, fontSize: 20})}
                {RenderIcon({icon: GrAdd, fontSize: 20, display: {base: 'none', md: 'flex'}})}
            </>
        </Flex>
    );
};

export default Icons;

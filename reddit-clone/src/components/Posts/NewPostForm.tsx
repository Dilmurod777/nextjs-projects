import React, {useState} from 'react';
import {Flex, Icon} from "@chakra-ui/react";
import {IoDocumentText, IoImageOutline} from "react-icons/io5";
import {BsLink45Deg, BsMic} from "react-icons/bs";
import {BiPoll} from "react-icons/bi";
import NewPostFormItem from "./NewPostFormItem";
import TextInputs from "./PostForm/TextInputs";

type NewPostProps = {};

const FormTabs: TabItem[] = [
    {
        title: 'Post',
        icon: IoDocumentText
    },
    {
        title: 'Images & Video',
        icon: IoImageOutline
    },
    {
        title: 'Link',
        icon: BsLink45Deg,
    },
    {
        title: 'Poll',
        icon: BiPoll
    },
    {
        title: 'Talk',
        icon: BsMic
    }
]

export type TabItem = {
    title: string,
    icon: typeof Icon.arguments
}

const NewPostForm: React.FC<NewPostProps> = (props) => {
    const [selectedTabTitle, setSelectedTabTitle] = useState(FormTabs[0].title)
    const [textInputs, setTextInputs] = useState({
        title: '',
        body: ''
    })
    const [selectedFile, setSelectedFile] = useState<string>()

    const handleCreatePost = async () => {

    }

    const handleSelectImage = () => {}

    const handleTextChange = () => {}

    return (
        <Flex direction={'column'} bg={"white"} borderRadius={'4'} mt={2}>
            <Flex width={'100%'}>
                {FormTabs.map((tab, index) =>
                    <NewPostFormItem
                        key={index}
                        item={tab}
                        selected={tab.title === selectedTabTitle}
                        setSelectedTabTitle={setSelectedTabTitle}
                    />
                )}
            </Flex>
            <Flex p={4}>
                <TextInputs/>
            </Flex>
        </Flex>
    );
};

export default NewPostForm;

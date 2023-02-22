import React from 'react';
import PageContent from "../../../components/Layout/PageContent";
import {Box, Text} from "@chakra-ui/react";
import NewPostForm from "../../../components/Posts/NewPostForm";

type SubmitPostPageProps = {};

const SubmitPostPage: React.FC<SubmitPostPageProps> = () => {
    return (
        <PageContent>
            <>
                <Box p={"14px 0"} borderBottom={"1px solid"} borderColor={"white"}>
                    <Text>Create a post</Text>
                </Box>
                <NewPostForm/>
            </>
            <></>
        </PageContent>
    );
};

export default SubmitPostPage;

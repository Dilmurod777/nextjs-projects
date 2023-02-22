import React from 'react';
import {GetServerSidePropsContext} from "next";
import {firestore} from "../../../firebase/client";
import {doc, DocumentData, getDoc} from "@firebase/firestore";
import {Community} from "../../../atoms/communitiesAtom";
import saveJsonStringify from 'safe-json-stringify';
import safeJsonStringify from "safe-json-stringify";
import NotFound from "../../../components/Community/NotFound";
import Header from "../../../components/Community/Header";
import PageContent from "../../../components/Layout/PageContent";
import CreatePostLink from "../../../components/Community/CreatePostLink";

type CommunityPageProps = {
    communityData: Community | null;
};

const CommunityPage: React.FC<CommunityPageProps> = ({communityData}) => {
    if (!communityData) {
        return <NotFound/>
    }

    return (
        <>
            <Header communityData={communityData}/>
            <PageContent>
                <>
                    <CreatePostLink/>
                </>
                <>
                    <div>Right</div>
                </>
            </PageContent>
        </>
    );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
    try {
        const communityDocRef = doc(firestore, 'communities', context.query.communityId as string)
        const communityDoc = await getDoc(communityDocRef)

        return {
            props: {
                communityData: communityDoc.exists()
                    ? JSON.parse(safeJsonStringify({id: communityDoc.id, ...communityDoc.data()}))
                    : null
            }
        }
    } catch (error) {
        console.log("getServerSideProps error", error)
    }
}

export default CommunityPage;

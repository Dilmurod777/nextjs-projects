import React, {useEffect, useState} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {Community, CommunitySnippet, communityState} from "../atoms/communitiesAtom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "../firebase/client";
import {collection, doc, getDocs, increment, writeBatch} from "@firebase/firestore";
import {authModalState} from "../atoms/authModalAtom";

const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const setAuthModalState = useSetRecoilState(authModalState);

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        setLoading(true);

        if (!user) {
            setAuthModalState({open: true, view: 'login'});
        }

        if (isJoined) {
            leaveCommunity(communityData.id)
                .then(() => {})
                .catch(() => {});
        } else {
            joinCommunity(communityData)
                .then(() => {})
                .catch(() => {});
        }
    }

    const getMySnippets = async () => {
        setLoading(true)
        try {
            const snippetsDocs = await getDocs(collection(firestore, `users/${user?.uid}/communitySnippets`));
            const snippets = snippetsDocs.docs.map(doc => ({...doc.data()}));

            setCommunityStateValue(prev => ({...prev, mySnippets: snippets as CommunitySnippet[]}))
        } catch (error: any) {
            console.log('getMySnippets error', error)
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const joinCommunity = async (communityData: Community) => {
        try {
            const batch = writeBatch(firestore);
            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageUrl: communityData.imageURL || '',
                isModerator: false,
            }

            batch.set(doc(firestore, `users/${user?.uid}/communitySnippets`, communityData.id), newSnippet)
            batch.update(doc(firestore, 'communities', communityData.id), {
                numberOfMembers: communityData.numberOfMembers + 1
            });

            await batch.commit();

            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet]
            }))
        } catch (error: any) {
            console.log('joinCommunity error', error)
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    const leaveCommunity = async (communityId: string) => {
        try {
            const batch = writeBatch(firestore);

            batch.delete(doc(firestore, `users/${user?.uid}/communitySnippets`, communityId));
            batch.update(doc(firestore, 'communities', communityId), {
                numberOfMembers: increment(-1)
            });

            await batch.commit();

            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(item => item.communityId !== communityId)
            }))
        } catch (error: any) {
            console.log('leaveCommunity error', error)
            setError(error.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user) return;

        getMySnippets()
            .then(() => {})
            .catch(() => {})
    }, [user])

    return {communityStateValue, onJoinOrLeaveCommunity, loading}
};

export default useCommunityData;

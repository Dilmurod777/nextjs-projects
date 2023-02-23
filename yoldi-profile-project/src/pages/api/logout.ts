import type {NextApiRequest, NextApiResponse} from 'next'
import {UserResponseData} from "@/utils/api";
import {auth, firestore, GetErrorMessage} from "@/utils/firebase";
import {signOut} from "@firebase/auth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserResponseData>
) {
    try {
        await signOut(auth);

        res.status(200).json({
            status: 'ok', data: 'Successfully signed out.'
        })
    } catch (e: any) {
        res.status(404).json({status: 'not_ok', data: GetErrorMessage(e.code)})
    }
};

import type {NextApiRequest, NextApiResponse} from 'next'
import {UserResponseData} from "@/utils/api";
import {auth, firestore, GetErrorMessage} from "@/utils/firebase";
import {createUserWithEmailAndPassword} from "@firebase/auth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserResponseData>
) {
    try {
        const {email, password, name} = req.body;

        if (!email || !password) {
            res.status(404).json({status: 'not_ok', data: 'Email or password are missing!'})
        }

        const response = await createUserWithEmailAndPassword(auth, email, password);

        res.status(200).json({
            status: 'ok', data: {
                uid: response.user.uid,
                name: name,
                email: response.user.email || '',
                imageUrl: response.user.photoURL || ''
            }
        })
    } catch (e: any) {
        res.status(404).json({status: 'not_ok', data: GetErrorMessage(e.code)})
    }
};

import type {NextApiRequest, NextApiResponse} from 'next'
import {auth, firestore} from "@/utils/firebase";
import {UserResponseData} from "@/utils/api";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserResponseData>
) {
    const user = auth.currentUser;

    if (user) {
        res.status(200).json({
            status: 'ok',
            data: {
                uid: user.uid,
                name: 'Unknown',
                email: user.email || '',
                imageUrl: user.photoURL || '',
                description: ''
            }
        })
    } else {
        res.status(200).json({
            status: 'not_ok',
            data: 'need_to_login'
        })
    }
}

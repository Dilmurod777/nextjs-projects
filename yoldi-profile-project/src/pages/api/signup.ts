import type {NextApiRequest, NextApiResponse} from 'next'
import {UserResponseData} from "@/utils/api";
import {auth, firestore, GetErrorMessage} from "@/utils/firebase";
import {createUserWithEmailAndPassword} from "@firebase/auth";
import {addDoc, collection, doc, getDoc} from "@firebase/firestore";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserResponseData>
) {
    try {
        const {email, password, name} = req.body;

        if (!email || !password) {
            res.status(404).json({status: 'not_ok', data: 'Email or password are missing!'})
        }

        const createUserResponse = await createUserWithEmailAndPassword(auth, email, password)

        // const response = await createUserWithEmailAndPassword(auth, email, password);
        const docRef = doc(firestore, `users`, email);
        const collectionRef = collection(firestore, 'users');
        const document = await getDoc(docRef);

        if (document.exists()) {
            return res.status(404).json({status: 'not_ok', data: 'auth/email-already-exists'})
        }

        await addDoc(collectionRef, {
            name,
            uid: createUserResponse.user.uid,
            photoUrl: '',
            backdropUrl: '',
            description: ''
        })

        res.status(200).json({
            status: 'ok', data: {
                uid: createUserResponse.user.uid,
                name: name,
                email: createUserResponse.user.email || '',
                photoUrl: createUserResponse.user.photoURL || '',
                backdropUrl: ''
            }
        })
    } catch (e: any) {
        res.status(404).json({status: 'not_ok', data: GetErrorMessage(e.code)})
    }
};

import {initializeApp} from "@firebase/app";
import {createUserWithEmailAndPassword, getAuth} from "@firebase/auth";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const firestore= getFirestore(app);

export const GetErrorMessage = (code: string): string => {
    let message = 'Unknown issue. Try again later.';

    switch (code) {
        case 'auth/email-already-exists':
        case 'auth/email-already-in-use':
            message = 'Email already used. Try again.'
            break;
        case 'auth/cors-unsupported':
            message = 'This browser is not supported. Try again.'
            break;
        case 'auth/user-not-found':
            message = 'User not found. Try again.'
            break;
        case 'auth/invalid-email':
            message = 'Invalid email. Try again.'
            break;
        case 'auth/wrong-password':
        case 'auth/invalid-password':
            message = 'Invalid password. Try again.'
            break;
        case 'auth/weak-password':
            message = 'Weak password. Passwords must be at least 6 characters length.'
            break;
        case 'auth/internal-error':
            message = 'Interval error. Try again later.'
            break;
    }

    return message;
}

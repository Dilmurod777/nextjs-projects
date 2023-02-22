import {AuthError} from "@firebase/auth";

export const FIREBASE_AUTH_ERRORS: { [key: string]: string } = {
    'auth/invalid-email': 'Invalid email address',
    'auth/user-disabled': 'User account has been disabled',
    'auth/user-not-found': 'User not found',
    'auth/wrong-password': 'Incorrect password',
    'auth/email-already-in-use': 'Email already in use',
    'auth/weak-password': 'Password must be at least 6 characters',
    'auth/operation-not-allowed': 'Operation not allowed',
    'auth/too-many-requests': 'Too many requests. Please try again later',
    'auth/account-exists-with-different-credential': 'Account already exists with different credentials',
    'auth/credential-already-in-use': 'Credential already in use',
    'auth/invalid-credential': 'Invalid credential',
    'auth/invalid-verification-code': 'Invalid verification code',
    'auth/invalid-verification-id': 'Invalid verification ID',
    'auth/missing-verification-code': 'Missing verification code',
    'auth/missing-verification-id': 'Missing verification ID',
    'auth/phone-number-already-exists': 'Phone number already exists',
    'auth/invalid-phone-number': 'Invalid phone number',
    'auth/quota-exceeded': 'Quota exceeded',
    'auth/captcha-check-failed': 'Captcha check failed',
    'auth/invalid-app-credential': 'Invalid app credential',
    'auth/invalid-app-id': 'Invalid app ID',
    'auth/missing-app-credential': 'Missing app credential',
    'auth/missing-app-id': 'Missing app ID',
    'auth/session-expired': 'Session expired',
    'auth/invalid-continue-uri': 'Invalid continue URI',
    'auth/missing-continue-uri': 'Missing continue URI',
    'auth/missing-phone-number': 'Missing phone number'
}

export const GetFirebaseAuthError = (error: AuthError | undefined) => {
    let errorMessage = '';
    if (error) {
        const code = error?.code;
        errorMessage = FIREBASE_AUTH_ERRORS[code];
    }
    return errorMessage;
}

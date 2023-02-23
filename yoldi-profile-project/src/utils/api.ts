export type UserResponseData = {
    data: {
        uid: string;
        name: string;
        email: string;
        description?: string;
        imageUrl?: string;
    } | string;

    status: 'ok' | 'not_ok';
}

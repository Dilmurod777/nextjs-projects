export type UserResponseData = {
    data: {
        uid: string;
        name: string;
        email: string;
        description?: string;
        photoUrl?: string;
        backdropUrl?: string;
    } | string;

    status: 'ok' | 'not_ok';
}

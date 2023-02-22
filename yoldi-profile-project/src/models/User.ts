export default class User{
    public name: string;
    public imageUrl: string;
    constructor() {
        this.name = 'Вячаслав';
        this.imageUrl = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80';
    }

    static getUser(){
        let user = new User();
        // @ts-ignore
        user = null;
        return user;
    }
}

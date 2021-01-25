export interface IAccountApp {
    id: string;
    baseUrl?: string;
    key?: string;
    secret?: string;
    type?: 'paper' | 'live';
    editable?: boolean;
}

export interface IAccount {
    _id?: string;
    email?: string;
    uid?: string;
    apps?: IAccountApp[];
}

export interface IAccountApp {
  id: string
  baseUrl?: string
  key?: string
  secret?: string
}

export interface IAccount {
  _id?: string
  email?: string
  uid?: string
  apps?: IAccountApp[]
}

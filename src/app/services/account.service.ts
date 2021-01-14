import { Injectable } from '@angular/core';
import { IAccount } from '../shared/interfaces/IAccount';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  account: IAccount
  account$ = new Subject<IAccount>();

  constructor(
    private apiService: ApiService
  ) { }

  private next(acc?: IAccount): void{
    this.account$.next(acc || this.account)
}

  async fetchAccount(): Promise<void>{
    const account = await this.apiService.getAccount()
    
    this.next(account)
  }

  async updateAccount(data: Partial<IAccount>): Promise<IAccount>{
    const account = await this.apiService.updateAccount(data)

    this.next(account)

    return account
  }
}

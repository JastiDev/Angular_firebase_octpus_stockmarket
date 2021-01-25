import { Component, OnInit } from '@angular/core';
import { IAccount, IAccountApp } from 'app/shared/interfaces/IAccount';
import { AccountService } from '../../../services/account.service';
import { untilDestroyed, UntilDestroy } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';

@UntilDestroy()
@Component({
    selector: 'app-myapps',
    templateUrl: './myapps.component.html',
    styleUrls: ['./myapps.component.scss'],
})
export class MyappsComponent implements OnInit {
    account: IAccount;

    typeOptions = [
        { label: 'Paper', value: 'paper' },
        { label: 'Live', value: 'live' },
    ];

    constructor(private accountService: AccountService) {
        this.accountService.account$.pipe(untilDestroyed(this)).subscribe((acc) => {
            this.account = acc;
        });
    }

    ngOnInit(): void {
        this.accountService.fetchAccount();
    }

    onClickReset(app: IAccountApp) {
        if (window.confirm('Reset app? Current data will be lost.')) {
            app.editable = true;
            app.key = '';
            app.secret = '';
        }
    }

    async save(app: IAccountApp): Promise<void> {
        app.editable = false;
        let newAccount = await this.accountService.updateAccount({
            apps: this.account.apps,
        });
        console.log(newAccount);
    }
}

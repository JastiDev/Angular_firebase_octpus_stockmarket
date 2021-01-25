import { Component, OnInit } from '@angular/core';
import { IAccount } from 'app/shared/interfaces/IAccount';
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
    hideKeyId = true;
    hideSecretKey = true;
    account: IAccount;

    typeOptions = [
        { label: 'Paper', value: 'paper' },
        { label: 'Live', value: 'live' },
    ];

    constructor(private accountService: AccountService) {
        this.accountService.account$.pipe(untilDestroyed(this)).subscribe((acc) => {
            this.account = acc;
            console.log(acc);
        });
    }

    ngOnInit(): void {
        this.accountService.fetchAccount();
    }

    save(): void {
        this.accountService.updateAccount({
            apps: this.account.apps,
        });
    }
}

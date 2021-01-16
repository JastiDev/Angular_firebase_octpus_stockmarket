import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'main-ticker-search',
    templateUrl: './ticker-search.component.html',
    styleUrls: ['./ticker-search.component.scss'],
})
export class TickerSearchComponent implements OnInit, OnDestroy {
    searchControl = new FormControl();
    filteredArr: IRespTicker[];
    isLoading = false;
    errMsg: string;
    subscription: Subscription;

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.subscription = this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe((x) => {
            this.filteredArr = [];
            this.isLoading = true;
            this.search(x).subscribe(
                (arr) => {
                    this.filteredArr = arr;
                    this.isLoading = false;
                },
                (err) => {
                    console.log(err);
                    this.errMsg = err['message'] || err;
                    this.isLoading = false;
                }
            );
        });
    }

    search(text: string): Observable<IRespTicker[]> {
        const ret = this.http.get<IRespTicker[]>(`https://ticker-2e1ica8b9.now.sh/keyword/${text}`);
        return ret;
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

interface IRespTicker {
    symbol: string;
    name: string;
}

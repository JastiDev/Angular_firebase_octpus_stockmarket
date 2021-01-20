import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
    selector: 'main-ticker-search',
    templateUrl: './ticker-search.component.html',
    styleUrls: ['./ticker-search.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TickerSearchComponent),
            multi: true,
        },
    ],
})
export class TickerSearchComponent implements OnInit, OnDestroy, ControlValueAccessor {
    searchControl = new FormControl();
    filteredArr: IRespTicker[];
    isLoading = false;
    errMsg: string;
    subscription: Subscription;

    val: string;
    set value(v) {
        this.val = v;
        if (this.searchControl.value !== v) this.searchControl.setValue(v);
    }

    get value() {
        return this.val;
    }

    onChange: any = () => {};
    onTouch: any = () => {};

    constructor(private http: HttpClient) {}

    // programmatically writing the value
    writeValue(value: any): void {
        this.value = value;
    }
    // method to be triggered on UI change
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    // method to be triggered on component touch
    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    ngOnInit(): void {
        this.subscription = this.searchControl.valueChanges.pipe(debounceTime(500)).subscribe((x) => {
            this.filteredArr = [];
            if (x === '') {
                return;
            }
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

    onSelect(event: MatAutocompleteSelectedEvent): void {
        this.value = event.option.value;
        this.onChange(this.value);
    }
}

interface IRespTicker {
    symbol: string;
    name: string;
}

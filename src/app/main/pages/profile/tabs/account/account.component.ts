import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { fuseAnimations } from "@fuse/animations";
import { FuseProgressBarService } from "@fuse/components/progress-bar/progress-bar.service";
import { User } from "firebase/app";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { ProfileService } from "../../profile.service";

@Component({
    selector: "profile-account",
    templateUrl: "./account.component.html",
    styleUrls: ["./account.component.scss"],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AccountComponent implements OnInit, OnDestroy {
    displayName: string = "";
    email: string = "";
    password: string = "";

    // Private
    private _unsubscribeAll: Subject<any>;

    constructor(
        private _fuseProgress: FuseProgressBarService,
        private _formBuilder: FormBuilder,
        public _profileService: ProfileService,
        private router: Router,
        private snack: MatSnackBar
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this._profileService.accountOnChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: User) => {
                this.displayName = user.displayName;
                this.email = user.email;
                this.password = "";
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    changeDisplayName() {
        this._profileService.updateProfile(this.displayName);
    }
    changeEmail() {
        this._profileService.updateEmail(this.email);
    }
    changePassword() {
        this._profileService.updatePassword(this.password);
    }
}

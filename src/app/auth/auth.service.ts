import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, User } from 'firebase/app';
import { Subject } from 'rxjs';
import { UserRole } from './auth.roles';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface ISignInCredentials {
    email: string;
    password: string;
}

export interface ICreateCredentials {
    email: string;
    password: string;
    displayName: string;
}

export interface IPasswordReset {
    code: string;
    newPassword: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user;
    subjectAuth = new Subject<{ isAuthed: boolean; user: any }>();

    constructor(
        // tslint:disable-next-line: no-shadowed-variable
        private auth: AngularFireAuth,
        private router: Router,
        public ngZone: NgZone,
        private snack: MatSnackBar
    ) {}

    init(): void {
        this.autoLogin();
        this.auth.authState.subscribe((userData: User) => {
            this.setUserData(userData, UserRole.FreeUser);
        });
    }

    private autoLogin(): void {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const userRole = JSON.parse(localStorage.getItem('userRole'));
        this.setUserData(userData, userRole);
    }

    private setUserData(userData, userRole): void {
        if (userData) {
            this.user = { ...userData, role: userRole };
            localStorage.setItem('userData', JSON.stringify(userData));
            localStorage.setItem('userRole', JSON.stringify(userRole));
            this.subjectAuth.next({ isAuthed: true, user: this.user });
        } else {
            this.user = null;
            localStorage.setItem('userData', null);
            localStorage.setItem('userRole', null);
            this.subjectAuth.next({ isAuthed: false, user: this.user });
        }
    }

    // tslint:disable-next-line:typedef
    emailSignIn(credentials: ISignInCredentials) {
        return this.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    async signOut(): Promise<void> {
        await this.auth.signOut();
        this.ngZone.run(() => {
            this.router.navigate(['/pages/auth/login']);
        });
    }

    // tslint:disable-next-line:typedef
    emailSignUp(credentials: ICreateCredentials) {
        return this.auth.createUserWithEmailAndPassword(credentials.email, credentials.password).then(async ({ user }) => {
            user.updateProfile({
                displayName: credentials.displayName,
            });
            this.auth.updateCurrentUser(user);
            return user;
        });
    }

    updateProfile(displayName: string, photoURL: string = ''): void {
        this.auth.currentUser
            .then((userData) => {
                userData
                    .updateProfile({ displayName, photoURL })
                    .then(() => {
                        this.setUserData(userData, UserRole.FreeUser);
                        this.snack.open('Successfully changed', 'Dismiss', {
                            duration: 2000,
                            horizontalPosition: 'right',
                        });
                    })
                    .catch((error) => {
                        this.snack.open('Failed: ' + error.message, 'Dismiss', {
                            duration: 5000,
                            horizontalPosition: 'right',
                        });
                    });
                this.auth.updateCurrentUser(userData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updateEmail(email: string): void {
        this.auth.currentUser
            .then((userData) => {
                userData
                    .updateEmail(email)
                    .then(() => {
                        this.setUserData(userData, UserRole.FreeUser);
                        this.snack.open('Successfully changed', 'Dismiss', {
                            duration: 2000,
                            horizontalPosition: 'right',
                        });
                    })
                    .catch((error) => {
                        this.snack.open('Failed: ' + error.message, 'Dismiss', {
                            duration: 5000,
                            horizontalPosition: 'right',
                        });
                    });
                this.auth.updateCurrentUser(userData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    updatePassword(password: string): void {
        this.auth.currentUser
            .then((userData) => {
                userData
                    .updatePassword(password)
                    .then(() => {
                        this.setUserData(userData, UserRole.FreeUser);
                        this.snack.open('Successfully changed', 'Dismiss', {
                            duration: 2000,
                            horizontalPosition: 'right',
                        });
                    })
                    .catch((error) => {
                        this.snack.open('Failed: ' + error.message, 'Dismiss', {
                            duration: 5000,
                            horizontalPosition: 'right',
                        });
                    });

                this.auth.updateCurrentUser(userData);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    googleAuth(): void {
        this.auth
            .signInWithPopup(new auth.GoogleAuthProvider())
            .then(({ user }) => {
                setTimeout(() => {
                    this.ngZone.run(() => {
                        this.router.navigate(['']);
                    });
                }, 500);
            })
            .catch((error) => {
                this.ngZone.run(() => {
                    this.snack.open('Failed: ' + error.message, 'Dismiss', {
                        duration: 5000,
                    });
                });
            });
    }

    facebookAuth(): void {
        this.auth
            .signInWithPopup(new auth.FacebookAuthProvider())
            .then(({ user }) => {
                setTimeout(() => {
                    this.ngZone.run(() => {
                        this.router.navigate(['']);
                    });
                }, 500);
            })
            .catch((error) => {
                this.ngZone.run(() => {
                    this.snack.open('Failed: ' + error.message, 'Dismiss', {
                        duration: 5000,
                    });
                });
            });
    }

    // tslint:disable-next-line:typedef
    sendPasswordResetEmail(email) {
        return this.auth.sendPasswordResetEmail(email).then(() => {
            return true;
        });
    }

    // tslint:disable-next-line:typedef
    resetPassword(credentials: IPasswordReset) {
        return this.auth.confirmPasswordReset(credentials.code, credentials.newPassword).then((data) => {
            return data;
        });
    }
}

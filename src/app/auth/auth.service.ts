import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { from, Subject } from 'rxjs';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { UserRole } from './auth.roles';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

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
  subjectAuth = new Subject<boolean>();

  constructor(
    private auth: AngularFireAuth,
    private notifications: NotificationsService,
    private router: Router,
    public ngZone: NgZone
  ) {}

  init() {
    this.auth.authState.subscribe((userData) => {
      if (userData) {
        this.user = { ...userData, role: UserRole.Admin };
        localStorage.setItem('user', JSON.stringify(userData));
        JSON.parse(localStorage.getItem('user'));
        this.subjectAuth.next(true);
      } else {
        this.user = null;
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
        this.subjectAuth.next(false);
      }
    });
  }

  // tslint:disable-next-line:typedef
  emailSignIn(credentials: ISignInCredentials) {
    return this.auth
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(({ user }) => {
        return user;
      });
  }

  async signOut() {
    await this.auth.signOut();
    await localStorage.removeItem('user');
  }

  // tslint:disable-next-line:typedef
  emailSignUp(credentials: ICreateCredentials) {
    return this.auth
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(async ({ user }) => {
        user.updateProfile({
          displayName: credentials.displayName,
        });
        this.auth.updateCurrentUser(user);
        this.user = user;
        return user;
      });
  }

  googleAuth() {
    this.auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(({ user }) => {
        this.ngZone.run(() => {
          this.router.navigate([environment.adminRoot]);
        });
      })
      .catch((error) => {
        this.notifications.create(
          'Error',
          error.message,
          NotificationType.Bare,
          { theClass: 'outline primary', timeOut: 6000, showProgressBar: false }
        );
      });
  }

  facebookAuth() {
    this.auth
      .signInWithPopup(new auth.FacebookAuthProvider())
      .then(({ user }) => {
        this.ngZone.run(() => {
          this.router.navigate([environment.adminRoot]);
        });
      })
      .catch((error) => {
        this.notifications.create(
          'Error',
          error.message,
          NotificationType.Bare,
          { theClass: 'outline primary', timeOut: 6000, showProgressBar: false }
        );
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
    return this.auth
      .confirmPasswordReset(credentials.code, credentials.newPassword)
      .then((data) => {
        return data;
      });
  }
}

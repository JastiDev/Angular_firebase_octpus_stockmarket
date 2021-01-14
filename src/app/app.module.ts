import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';
import { FakeDbService } from 'app/fake-db/fake-db.service';

import { AppComponent } from 'app/app.component';

import { AuthGuard } from 'app/auth/auth.guard';

// modules
import { LayoutModule } from 'app/layout/layout.module';
import { UserRole } from './auth/auth.roles';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'environments/environment';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const appRoutes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./main/home/home.module').then((m) => m.HomeModule),
        canActivate: [AuthGuard],
        data: { roles: [UserRole.FreeUser, UserRole.ProUser] },
    },
    {
        path: 'pages',
        loadChildren: () => import('./main/pages/pages.module').then((m) => m.PagesModule),
    },
    {
        path: 'editor',
        loadChildren: () => import('./main/editor/editor.module').then((m) => m.EditorModule),
    },
    {
        path: 'editor/:flowId',
        loadChildren: () => import('./main/editor/editor.module').then((m) => m.EditorModule),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
    },
    {
        path: '**',
        redirectTo: 'pages/errors/error-404',
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),

        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FakeDbService, {
            delay: 0,
            passThruUnknownUrl: true,
        }),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFireAuthGuardModule,
        FontAwesomeModule,
    ],
    bootstrap: [AppComponent],
    providers: [AuthGuard],
})
export class AppModule {}

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule }   from '@angular/common/http';
import {UIRouterModule} from "@uirouter/angular";
import {MatDialogModule} from '@angular/material/dialog';
import {AppComponent, DialogOverviewExampleDialog} from './app.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule, MatIconRegistry, MatStepperModule} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';


/*Angular material - forms.*/
import {MatInputModule} from '@angular/material/input';
import { AuthPageControllerComponent } from './auth-page-controller/auth-page-controller.component';
import {
    AuthPageRegisterControllerComponent
} from './auth-page-register-controller/auth-page-register-controller.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { AuthRoutesComponent } from './auth-routes/auth-routes.component';
import { MainContentComponent } from './main-content/main-content.component';
import { OtherContentComponent } from './other-content/other-content.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthService} from './auth.service';
import {AuthGuard} from './auth.guard';
import {AuthenticationService} from './authentication.service';
import {RegisterService} from './register.service';
import {JwtInterceptor} from './jwt.interceptor';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion';

import {EventFontService, EventLogoutService, EventRouteService, EventService, EventTitleService} from './event.service';
import {RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule } from 'ng-recaptcha';
import {CitiesService} from './main-content/cities.service';
import { UsersListComponent } from './users-list/users-list.component';
import {MatMenuModule} from '@angular/material/menu';
import {UsersListServiceService} from './users-list/users-list-service.service';
import {MatPaginatorModule} from '@angular/material/paginator';
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { Ng2SearchPipeModule } from 'ng2-search-filter' ; // импортирование модуля
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
/*Drag'n'drop.*/
import {DndModule} from 'ng2-dnd';
import {MatListModule} from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
/*Charts Data*/
import { Ng2GoogleChartsModule } from 'ng2-google-charts';


/* Data tree FusionChart. */


// определение маршрутов
const appRoutes: Routes =[
    { path: '', component: MainContentComponent, pathMatch:'full', canActivate: [AuthGuard]},
    { path: 'login', component: AuthRoutesComponent, pathMatch:'full'},
    { path: 'other', component: OtherContentComponent, pathMatch:'full', canActivate: [AuthGuard]},
    { path: 'users-list', component: UsersListComponent, pathMatch:'full', canActivate: [AuthGuard]},
    { path: 'adminPanel/:id', component: AdminPanelComponent, pathMatch:'full', canActivate: [AuthGuard]},
    { path: '**', redirectTo: '/'}
];


@NgModule({
  declarations: [
    AppComponent,
    AuthPageControllerComponent,
    AuthPageRegisterControllerComponent,
    AuthRoutesComponent,
      OtherContentComponent,
      AdminPanelComponent,
      MainContentComponent,
      DialogOverviewExampleDialog,
      UsersListComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCheckboxModule,
      ReactiveFormsModule,
      MatCardModule,
      MatDialogModule,
      MatTableModule,
      MatInputModule,
      MatSnackBarModule,
      MatIconModule,
      RecaptchaModule.forRoot(),

      MatExpansionModule,
      MatMenuModule,
      MatGridListModule,
      MatTableModule,
      Ng2OrderModule,
      Ng2SearchPipeModule,
      MatPaginatorModule,
      NgxPaginationModule,
      MatSortModule,
      DndModule.forRoot(),
      MatListModule,
      MatSlideToggleModule,
      MatTooltipModule,
      Ng2GoogleChartsModule,





      MatToolbarModule,
      MatTabsModule,
      HttpClientModule,
      MalihuScrollbarModule.forRoot(),
      RouterModule.forRoot(appRoutes),
     // UIRouterModule.forRoot({ states: [ ], useHash: true })
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
  ],
  providers: [
      {
          provide: RECAPTCHA_SETTINGS,
          useValue: { siteKey: '6LdG60kUAAAAAE7Z_Sr4NMEVEtnCcRRYJaRkORw_' } as RecaptchaSettings,
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
      },
      AuthService,
      AuthGuard,
      AuthenticationService,
      RegisterService,
      MatIconRegistry,
      EventService,
      EventLogoutService,
      CitiesService,
      EventRouteService,
      EventTitleService,
      EventFontService,
      UsersListServiceService
  ],
    entryComponents: [AppComponent, DialogOverviewExampleDialog, UsersListComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { BaseUrlInterceptor } from './shared/base-url.interceptor';
import { ScreenCheckedPipe } from './shared/pipes/screen-checked.pipe';

import { AppComponent } from './app.component';
import { ListInsuranceComponent } from './list-insurance/list-insurance.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './errors/page-not-found.component';
import { UploadModule } from './upload/upload.module';

@NgModule({
	declarations: [AppComponent, ListInsuranceComponent, ScreenCheckedPipe, SearchFormComponent, LandingPageComponent, PageNotFoundComponent],
	imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule, UploadModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }],
	bootstrap: [AppComponent]
})
export class AppModule { }

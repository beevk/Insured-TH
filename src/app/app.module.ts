import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseUrlInterceptor } from './shared/base-url.interceptor';
import { ListInsuranceComponent } from './list-insurance/list-insurance.component';
import { ScreenCheckedPipe } from './shared/pipes/screen-checked.pipe';
import { SearchFormComponent } from './search-form/search-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

@NgModule({
	declarations: [AppComponent, ListInsuranceComponent, ScreenCheckedPipe, SearchFormComponent, LandingPageComponent],
	imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }],
	bootstrap: [AppComponent]
})
export class AppModule { }

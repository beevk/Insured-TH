import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FileTransferModule } from './file-transfer/file-transfer.module';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { BaseUrlInterceptor } from './shared/base-url.interceptor';
import { ScreenCheckedPipe } from './shared/pipes/screen-checked.pipe';

import { AppComponent } from './app.component';
import { ListInsuranceComponent } from './list-insurance/list-insurance.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PageNotFoundComponent } from './errors/page-not-found.component';
import { CardsComponent } from './UI/cards/cards.component';
import { TableComponent } from './UI/table/table.component';

@NgModule({
	declarations: [AppComponent, ListInsuranceComponent, ScreenCheckedPipe, SearchFormComponent, LandingPageComponent, PageNotFoundComponent, CardsComponent, TableComponent],
	imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, AutocompleteLibModule, FileTransferModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }],
	bootstrap: [AppComponent]
})
export class AppModule { }

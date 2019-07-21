import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListOptionsComponent } from './list-options/list-options.component';
import { BaseUrlInterceptor } from './shared/base-url.interceptor';
import { ListInsuranceComponent } from './list-insurance/list-insurance.component';
import { ScreenCheckedPipe } from './shared/pipes/screen-checked.pipe';

@NgModule({
	declarations: [AppComponent, ListOptionsComponent, ListInsuranceComponent, ScreenCheckedPipe],
	imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule],
	providers: [{ provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }],
	bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AppComponent } from './app.component';
import { LandingPageComponent } from './landing-page/landing-page.component';

const routes: Routes = [
	{ path: '', component: LandingPageComponent },
	// { path: 'upload', component: LandingPageComponent },
	// 	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

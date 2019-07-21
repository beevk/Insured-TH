import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListInsuranceComponent } from './list-insurance/list-insurance.component';

const routes: Routes = [
	// 	{ path: '', component: AppComponent },
	{ path: ':brandId/:model/:make', component: ListInsuranceComponent },
	// 	{ path: 'insurance', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }

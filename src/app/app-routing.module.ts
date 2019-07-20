import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
	// 	{ path: '', component: AppComponent },
	// 	{ path: 'insurance/:brand:model:make', component: AppComponent },
	// 	{ path: 'insurance', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}

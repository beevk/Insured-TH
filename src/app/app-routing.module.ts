import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UploadFileComponent } from './fileTransfer/upload-file/upload-file.component';
import { PageNotFoundComponent } from './errors/page-not-found.component';

const routes: Routes = [
	{ path: '', component: LandingPageComponent },
	{ path: 'upload', component: UploadFileComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }


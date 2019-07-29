import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { UploadFileComponent } from './file-transfer/upload-file/upload-file.component';
import { DownloadFileComponent } from './file-transfer/download-file/download-file.component';
import { PageNotFoundComponent } from './errors/page-not-found.component';

const routes: Routes = [
	{ path: '', component: LandingPageComponent },
	{ path: 'upload', component: UploadFileComponent },
	{ path: 'download', component: DownloadFileComponent },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }


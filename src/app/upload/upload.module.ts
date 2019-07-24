import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxFileDropModule } from 'ngx-file-drop';

import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [UploadFileComponent],
  imports: [
    CommonModule,
    NgxFileDropModule
  ]
})
export class UploadModule { }

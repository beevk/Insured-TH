import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { UploadFileComponent } from './upload-file/upload-file.component';
import { DownloadFileComponent } from './download-file/download-file.component';
import { FileSizePipe } from './shared/file-size.pipe';
import { environment } from '../../environments/environment';
import { DropZoneDirective } from './shared/drop-zone.directive';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [UploadFileComponent, DownloadFileComponent, FileSizePipe, DropZoneDirective],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AutocompleteLibModule
  ]
})
export class FileTransferModule { }

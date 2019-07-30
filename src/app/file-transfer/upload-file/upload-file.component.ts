import { Component, OnInit } from '@angular/core';
// import { HttpEventType } from '@angular/common/http';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { OptionsService } from 'src/app/shared/options.service';
import { IBrand } from 'src/app/shared/models/brand.interface';
import { TransferService } from '../shared/transfer.service';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
  brandList: IBrand[];
  brandId: number;
  task: AngularFireUploadTask;
  uploadPercentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  fileDropped: boolean;
  completeFileName: string;
  paused = false;
  uploadCancelled = false;

  private fileName: string;
  private newFileName: number;
  private fileExtension: string;
  private file: File;

  constructor(private options: OptionsService, private storage: AngularFireStorage, private ft: TransferService) { }

  ngOnInit() {
    this.options.listBrands().subscribe(data => {
      if (data.status) {
        this.brandList = data['return_value'] as IBrand[];
      } else {
        // Handle Errors
        console.error('Error Fetching from HTTP -', data);
      }
    });
  }

  selectBrand(brand) {
    this.brandId = brand.record_id;
  }

  clearBrand() {
    this.brandId = undefined;
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  prepareUpload(event: FileList) {
    this.downloadURL = undefined;
    this.fileDropped = true;
    this.uploadCancelled = false;
    this.file = event.item(0);
    this.fileExtension = this.getFileExtension(this.file.name);
    this.newFileName = this.generateName();
    this.fileName = this.getFileName(this.file.name, this.fileExtension);
    this.completeFileName = this.fileName + '.' + this.fileExtension;
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  startUpload() {
    // The storage path - Replace test with brandId
    this.uploadCancelled = false;
    const path = `${this.brandId}/${this.newFileName}.${this.fileExtension}`;
    const type = this.file.type.toString();
    const customMetadata = { originalFileType: type };

    // This uploads the file to Firebase
    this.task = this.storage.upload(path, this.file, { customMetadata });

    this.uploadPercentage = this.task.percentageChanges();
    const fileRef = this.storage.ref(path);
    // this.snapshot = this.task.snapshotChanges();

    this.snapshot = this.task.snapshotChanges().pipe(
      tap(snap => {
        if (snap.bytesTransferred === snap.totalBytes) {
          this.uploadFileRecord();
          // Update firestore on completion
          // this.db.collection('photos').add({ path, size: snap.totalBytes })
        }
      })
    );

    this.task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => this.downloadURL = url);
      })
    ).subscribe();

  }

  clearFile() {
    this.file = undefined;
    this.fileDropped = undefined;
    this.newFileName = undefined;
    this.completeFileName = undefined;
  }

  uploadFileRecord() {
    console.log('Uploading file record!');
    this.ft.uploadFileRecord(this.brandId, this.fileName, this.fileExtension, this.newFileName)
      .subscribe(() => {
        this.fileDropped = false;
      });
  }

  isValid(): boolean {
    return (this.brandId && this.fileDropped);
  }

  private getFileExtension(fileName: string) {
    const a = fileName.split('.');
    if (a.length === 1 || (a[0] === '' && a.length === 2)) {
      return '';
    }
    return a.pop();
  }

  private generateName(): number {
    const timeStamp = Date.now().toString() + Math.floor(1000 + Math.random() * 9000).toString();
    return parseInt(timeStamp, 10);
  }

  private getFileName(name: string, fileExtension: string): string {
    const extLength = fileExtension.length;
    if (extLength === 0) { return name; }

    for (let i = extLength - 1, j = name.length - 1; i !== 0; i-- , j--) {
      if (name[j] !== fileExtension[i]) { return name; }
    }
    return name.slice(0, -extLength - 1);
  }
}

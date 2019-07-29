import { Component, OnInit } from '@angular/core';
// import { HttpEventType } from '@angular/common/http';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import { OptionsService } from 'src/app/shared/options.service';
import { IBrand } from 'src/app/shared/models/brand.interface';
import { TransferService } from '../shared/transfer.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
  paused: boolean = false;

  private fileName: string;
  private newFileName: number;
  private fileExtension: string;
  private file: File;

  constructor(private options: OptionsService, private storage: AngularFireStorage, private ft: TransferService) { }

  ngOnInit() {
    this.options.listBrands().subscribe(data => {
      if (data['status']) {
        this.brandList = <IBrand[]>data['return_value'];
      } else {
        // Handle Errors
        console.error('Error Fetching from HTTP -', data);
      }
    })
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
    this.file = event.item(0);
    this.fileName = this.file.name.split('.').slice(0, -1).join('.')
    this.newFileName = this.generateName();
    this.fileExtension = this.getFileExtension(this.file.name);
    this.completeFileName = this.fileName + '.' + this.fileExtension;
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  startUpload() {
    // The storage path - Replace test with brandId
    const path = `${this.brandId}/${this.newFileName}.${this.fileExtension}`;

    // This uploads the file to Firebase
    this.task = this.storage.upload(path, this.file);

    this.uploadPercentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges();
    const fileRef = this.storage.ref(path);
    // this.downloadURL = this.task.getDownloadURL()

    this.task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => this.downloadURL = url);
        this.uploadFileRecord();
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
    this.ft.uploadFileRecord(this.brandId, this.fileName, this.fileExtension, this.newFileName)
      .subscribe(() => {
        this.fileDropped = false;
      });
  }

  isValid(): boolean {
    return (this.brandId && this.fileDropped);
  }

  private getFileExtension(fileName: string) {
    let a = fileName.split(".");
    if (a.length === 1 || (a[0] === "" && a.length === 2)) {
      return "";
    }
    return a.pop();
  }

  private generateName(): number {
    const timeStamp = Date.now().toString() + Math.floor(1000 + Math.random() * 9000).toString();
    return parseInt(timeStamp, 10);
  }
}

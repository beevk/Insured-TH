import { Component, OnInit } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/storage';

import { OptionsService } from 'src/app/shared/options.service';
import { IBrand } from 'src/app/shared/models/brand.interface';
import { TransferService } from '../shared/transfer.service';
import { IFileDetails } from '../shared/file-details.interface';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.scss']
})
export class DownloadFileComponent implements OnInit {
  brandList: IBrand[];
  brandId: number;
  downloadList: IFileDetails[];
  noFileFound: boolean;

  constructor(private options: OptionsService, private storage: AngularFireStorage, private transfer: TransferService) { }

  ngOnInit() {
    this.options.listBrands().subscribe(data => {
      if (data['status']) {
        this.brandList = <IBrand[]>data['return_value'];
      } else {
        // Handle Errors
        console.error('Error Fetching data from Server -', data);
      }
    })
  }

  selectBrand(brand) {
    this.brandId = brand.record_id;
  }

  clearBrand() {
    this.brandId = undefined;
  }

  fetchRecord() {
    this.transfer.fetchAllFilesRecord(this.brandId).subscribe((list) => {
      if (list['return_status'] === "success") {
        this.downloadList = list['return_value'];
        if (this.downloadList) {
          this.noFileFound = false;
          this.addDownloadLink(this.downloadList);
        } else {
          this.noFileFound = true;
        }

      }
      else {
        this.downloadList = undefined;
      }
    });
  }

  private addDownloadLink(list) {
    list.forEach(element => {
      const ref = this.storage.ref(`${element.source_rid}/${element.new_filename}.${element.new_file_extension}`);

      ref.getDownloadURL().subscribe(url => {
        element.fileURL = url.toString();
      })
    })
  }
}

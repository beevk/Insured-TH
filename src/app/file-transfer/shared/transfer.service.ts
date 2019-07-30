import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  uploadFileRecord(sourceId: number, originalFileName: string, extension: string, newFileName: number) {
    const options = {
      query_name: 'file_uploads_save',
      record_id: null,
      source_rid: sourceId,
      original_filename: originalFileName,
      original_file_extension: extension,
      new_filename: newFileName,
      new_file_extension: extension
    };

    return this.http.post(`Get`, null, {
      params: { id: JSON.stringify(options) }
    });
  }

  fetchAllFilesRecord(sourceId: number) {
    const options = {
      query_name: 'file_uploads_get',
      record_id: null,
      source_rid: sourceId
    };

    return this.http.post(`Get`, null, {
      params: { id: JSON.stringify(options) }
    });
  }

  fetchFileRecord(sourceId: number, recordId: number) {
    const options = {
      query_name: 'file_uploads_get',
      record_id: recordId,
      source_rid: sourceId
    };

    return this.http.post(`Get`, null, {
      params: { id: JSON.stringify(options) }
    });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OptionsService {
  constructor(private http: HttpClient) { }

  listBrands(): Observable<Object> {
    const options = {
      'query_name': 'brand_get',
      'company_rid': 1,
      'record_id': null
    };

    return this.http.post(`Get`, null, {
      params: { "id": JSON.stringify(options) }
    });
  }

  listModels(brand: string): Observable<Object> {
    const options = {
      'query_name': 'model_group_get',
      'company_rid': 1,
      'brand_code': brand,
      'record_id': null
    };

    return this.http.post(`Get`, null, {
      params: { "id": JSON.stringify(options) }
    });
  }

  listMakeYears(brandId: number, model: string): Observable<Object> {
    const options = {
      'query_name': 'model_year_get',
      'company_rid': 1,
      'brand_rid': brandId,
      'model_group': model
    };

    return this.http.post(`Get`, null, {
      params: { "id": JSON.stringify(options) }
    });
  }

  listInsurance(brandId: number, model: string, make: string): Observable<Object> {
    const options = {
      'query_name': 'brand_model_year_sum_insure_get',
      'company_rid': 1,
      'brand_rid': brandId,
      'model_group': model,
      'year_model': make
    }

    return this.http.post(`Get`, null, {
      params: { id: JSON.stringify(options) }
    });
  }
}

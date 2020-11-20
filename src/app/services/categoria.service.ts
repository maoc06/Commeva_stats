import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private url = `${environment.apiUrl}/api/v1/categoriaBeneficio/`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url);
  }

  public findById(id: number): Observable<any> {
    return this.httpClient.get(this.url + id);
  }
}

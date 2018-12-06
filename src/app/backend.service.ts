import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  public getPosts() {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts');
  }
}

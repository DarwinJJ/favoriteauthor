import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAuthors(){
    console.log('Getting All Authors')
    return this._http.get('/authors');
  }

  getOneAuthor(id) {
    console.log("Getting author details");
    let pStr = "/authors/" + id
    console.log("str: ", pStr)
    return this._http.get(pStr);
    // tmpObs.subscribe(data => console.log('Got one task', data));   
  }

  createAuthor(newAuth) {
    return this._http.post('/authors', newAuth)
  }

  updateAuthor(newAuth) {
    let pStr = "/authors/" + newAuth['id']
    console.log("str: ", pStr)
    return this._http.put(pStr, newAuth);
  }

  deleteAuthor(id) {
    let pStr = "/authors/" + id
    console.log("str: ", pStr)
    return this._http.delete(pStr);
  }
}
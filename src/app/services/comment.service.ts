import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  addComment(comment){
    return this.http.post<{msg:string,comment:any}>("http://localhost:3000/comments",comment)
  }

  getComment(id){
    return this.http.get<{comments:any}>(`http://localhost:3000/getcomments/${id}`);
  }
}

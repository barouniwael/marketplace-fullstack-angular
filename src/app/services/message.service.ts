import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }


postMessage(message){
  return this.http.post<{msg:string}>("http://localhost:3000/messages",message)
}

getMessage(id){
  return this.http.get<{message:any}>(`http://localhost:3000/getmessages/${id}`);
}

}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../core/http.service';

export interface Note {
  _id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private baseUrl = 'http://localhost:5000/api/notes';

  constructor(private httpService: HttpService) {}

  getAllNotes(): Observable<Note[]> {
    const url = `${this.baseUrl}/get/allData`;
    return this.httpService.get(url);
  }

  createNote(note: Note): Observable<Note> {
    const url = `${this.baseUrl}/create`;
    return this.httpService.post(url, note);
  }

  createMultipleNotes(notes: Note[]): Observable<Note[]> {
    const url = `${this.baseUrl}/create/multiple`;
    return this.httpService.post(url, notes);
  }

  deleteNote(id: string): Observable<any> {
    const url = `${this.baseUrl}/delete/${id}`; 
    return this.httpService.post(url, );
  }

  updateNote(id: string, note: Note): Observable<Note> {
    const url = `${this.baseUrl}/update/${id}`;
    return this.httpService.post(url, note);
  }
}

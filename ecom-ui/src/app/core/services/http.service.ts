// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    private baseUrl = 'http://localhost:3333/api';

    constructor(private http: HttpClient, private token: TokenService) { }

    // Set up headers, like authorization or content type
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token.getToken()}`
        });
    }

    // GET request
    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
    }

    // POST request
    post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body, { headers: this.getHeaders() });
    }

    // PUT request
    put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body, { headers: this.getHeaders() });
    }

    // DELETE request
    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}/${endpoint}`, { headers: this.getHeaders() });
    }
}

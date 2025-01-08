import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SbbInformation } from './modelData';

const baseUrl = 'http://localhost:3001/entrys';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    constructor(private http: HttpClient) {}

    /**
     * HTTP Function that calls the Backend with a City as a param
     * @param city
     * @returns
     */
    public getCertain(city: string): Observable<Array<SbbInformation>> {
        return this.http.get<Array<SbbInformation>>(baseUrl + '/' + city);
    }

    /**
     * Func that returns a Observable
     * @param didok Didoknummer
     * @returns Observable with data about a Stop
     */
    public getByDidiok(didok: number): Observable<Array<SbbInformation>> {
        return this.http.get<Array<SbbInformation>>(baseUrl + '/didok/' + didok);
    }
}

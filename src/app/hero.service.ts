import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  private heroUrl = 'api/heroes';

  constructor(
    private messsageService: MessageService,
    private http: HttpClient
  ) { }

  /**
   * Các phương thức của HeroService có thể khai thác  luông giá trị của observable 
   * và send message via log() mehtod 
   * sử dụng tap() xem xet các giá trị của observable và thực hiện something với các giá 
   * trị đó . tap() callback Không có tác động đến giá trị  
   * 
   */

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /**
   * Get hero by id , will 404 if id not found 
   * @param id 
   */

  getHeroById(id: number): Observable<Hero> {
    const url = `${this.heroUrl}/${id}`;

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHeroById id=${id}`))
    );
  }

  private log(message: string) {
    this.messsageService.add(`HeroService: ${message}`);
  }

  getHero(id: number): Observable<Hero> {
    this.messsageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  /**
   * Handle Http opertation that failed
   * Let app continue
   * @param operation name of the operation that failed 
   * 
   * @param result optional value to return as the observable result 
   */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> =>{
      //TODO: send the error to remote logging infrantructure
      console.log(error);
      //TODO: beter job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T)
    };
  }
}


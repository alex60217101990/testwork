import {Injectable, OnDestroy} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {element} from 'protractor';


export interface City {
    city: string;
    created_at: string;
    id: number;
    img: string;
    population: number;
    region: string;
    updated_at: string;
}

@Injectable()
export class CitiesService implements OnDestroy{
private Cities: Array<City>;
  constructor(private http: HttpClient) {
      this.Cities = new Array<City>();
      console.log(this.Cities.length);
  }

    ngOnDestroy() {
        this.Cities.length = 0;
    }

  public getCities():Observable<Array<City>>{
      return this.http.post('/content/getCities', 1)
          .map((response: Response) => {
              for(let element in response) {
                  if (response[element] instanceof Array) {
                      for(let item of response[element]){
                          this.Cities.push(item);
                      }
                  }
              }
              return this.Cities;
          });
  }

  public deleteCity(id: number): boolean{
      this.http.post('/content/deleteCity', {id: id}).subscribe((response: Response)=>{
          console.log(response);
      });
      return false;
  }

  public connect():any{
      this.http.post('/content/soccet', 1).subscribe((response)=>{
          console.log(response);
      });
  }
}



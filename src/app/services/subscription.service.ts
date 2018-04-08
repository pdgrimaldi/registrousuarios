import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable()
export class SubscriptionService {
  type: any;
  private subscribeURL = environment.servicesUrl.subscribe;

  constructor(private httpClient: HttpClient) { }

  subscribe(model): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let params;
    if (environment.useJsons) {
      return Observable.of('');
    } else {
      params = {
        'first_name': model.first_name,
        'last_name': model.last_name,
        'phone': model.phone,
        'interests': model.interests
      };

    }
    return this.httpClient.post(this.subscribeURL, params, httpOptions)
      .map(response => response)
      .catch(error => Observable.throw(error));
  }

}

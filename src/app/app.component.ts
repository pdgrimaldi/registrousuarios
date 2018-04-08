import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, EmailValidator } from '@angular/forms';
import { SubscriptionService } from './services/subscription.service';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit {
  public loading = false;

  model = {
    first_name: '',
    last_name: '',
    phone: '',
    interests: []
  };

  interests = [
    'Alerta meteorológico',
    'Alerta de cortes',
    'Eventos Culturales',
    'Estado tránsito autopista BS-LP',
    'Vencimiento de impuestos municipales'
  ];
  constructor(private subscriptionService: SubscriptionService, private toastr: ToastrService) { }

  ngOnInit() {
  }

  checkAll() {
    this.model.interests = JSON.parse(JSON.stringify(this.interests));
  }

  uncheckAll() {
    this.model.interests = [];
  }

  updateSelectedInterests(event) {
    if (event.target.checked) {
      if (this.model.interests.indexOf(event.target.name) < 0) {
        this.model.interests.push(event.target.name);
      }
    } else {
      if (this.model.interests.indexOf(event.target.name) > -1) {
        this.model.interests.splice(this.model.interests.indexOf(event.target.name), 1);
      }
    }
  }

  subscribe() {
    this.loading = true;
    this.subscriptionService.subscribe(this.model).subscribe(
      response => {
        this.toastr.success('La suscripción se ha creado satisfactoriamente. Un Mensaje de confirmación será enviado a su telefono',
          'Exito!');
        this.model.first_name = '';
        this.model.last_name = '';
        this.model.phone = '';
        this.model.interests = [];
        this.loading = false;
      },
      error => {
        this.toastr.error('En este momento no se puede suscribir. Intente mas tarde', 'Atención!');
        this.loading = false;
      }
    );
  }

}

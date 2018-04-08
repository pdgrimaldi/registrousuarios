import { Component, ViewChild } from '@angular/core';
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
export class AppComponent {

  public loading = false;
  @ViewChild('phone')
  phone: any;

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

  validToSubmit() {
    return this.model.first_name !== '' &&
      this.model.last_name !== '' &&
      (this.phone.valid && this.model.phone !== '') &&
      this.model.interests.length > 0;
  }

  subscribe() {
    this.loading = true;
    this.subscriptionService.subscribe(this.model).subscribe(
      response => {
        if (response.sent) {
          this.toastr.success('La suscripción se ha creado satisfactoriamente. Un Mensaje de confirmación será enviado a su telefono',
            'Éxito!');
          this.model.first_name = '';
          this.model.last_name = '';
          this.model.phone = '';
          this.model.interests = [];
          this.loading = false;
        } else {
          this.toastr.error('El número de teléfono inrgesado no es correcto. Por favor verifíquelo', 'Atención!');
          
          this.phone.nativeElement.focus();
          this.loading = false;
        }
      },
      error => {
        this.toastr.error('En este momento no se puede suscribir. Intente mas tarde', 'Atención!');
        this.loading = false;
      }
    );
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule,
  MatExpansionModule, MatDatepickerModule, MatInputModule, MatTabsModule,
  MatTooltipModule, MatFormFieldModule, MatMenuModule, MatSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { LoadingModule } from 'ngx-loading';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

import { SubscriptionService } from './services/subscription.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule,
    MatExpansionModule, MatDatepickerModule, MatInputModule, MatTabsModule,
    MatTooltipModule, MatFormFieldModule, MatMenuModule, MatSnackBarModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    LoadingModule,
    NgbModule.forRoot()
  ],
  providers: [SubscriptionService],
  bootstrap: [AppComponent]
})
export class AppModule { }

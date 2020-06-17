import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  name: string;
  email: string;
  password: string;
  phone_number: string;
  password_confirmation: string;
  error;
  loading: boolean = false;

  constructor(private router: Router, private authService: AuthService, private alertController: AlertController) {}

  ngOnInit() {}

  register() {
    this.loading = true;
    this.error = null;
    this.authService.signup(this.name, this.email, this.password, this.password_confirmation).subscribe(
      (res) => {
        this.alertController
          .create({
            header: 'Account Creation Successful',
            subHeader: 'Welcome ' + this.email,
            message: 'Kindly login with your credentials',
            buttons: ['OK']
          })
          .then((alert) => {
            alert.present();
          });

        this.router.navigate(['/login']);
      },
      (error) => {
        this.error = error.error;
        this.loading = false;
        console.log('errors', error);
      }
    );
  }
}

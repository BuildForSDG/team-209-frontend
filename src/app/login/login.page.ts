import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'protractor';

@Component({ selector: 'app-login', templateUrl: './login.page.html', styleUrls: ['./login.page.scss'] })
export class LoginPage implements OnInit {
  email: string;
  password: string;
  loading: boolean = false;
  error;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  login() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe(
      (res) => {
        console.log(res);
        this.loading = false;

        this.router.navigate(['/']);
        window.location.href = '/folder/New';
      },
      (error) => {
        this.error = error;
        this.loading = false;
        console.log(error);
      }
    );
  }
}

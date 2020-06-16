import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({ selector: 'app-root', templateUrl: 'app.component.html', styleUrls: ['app.component.scss'] })
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    // {
    //   title: 'New',
    //   url: '/folder/New',
    //   icon: 'mail'
    // },
    {
      title: 'Pending',
      url: '/folder/Pending',
      icon: 'paper-plane'
     }
    // {
    //   title: 'Closed',
    //   url: '/folder/Closed',
    //   icon: 'heart'
    // },
    // {
    //   title: 'Deleted',
    //   url: '/folder/Deleted',
    //   icon: 'archive'
    // }
  ];
  public labels = ['Logout'];
  public is_authenticated;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex((page) => page.title.toLowerCase() === path.toLowerCase());
    }
    this.authService.autologin();
    this.is_authenticated = this.authService.user;
    console.log(this.is_authenticated);
  }

  logout(){
    this.authService.logout();
    window.location.href = '/login';
  }
 
}

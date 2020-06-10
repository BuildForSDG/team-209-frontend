import {Component, OnInit} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({selector: 'app-root', templateUrl: 'app.component.html', styleUrls: ['app.component.scss']})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    public appPages = [
        {
            title: 'New',
            url: '/folder/Inbox',
            icon: 'mail'
        }, {
            title: 'Pending',
            url: '/folder/Outbox',
            icon: 'paper-plane'
        }, {
            title: 'Closed',
            url: '/folder/Favorites',
            icon: 'heart'
        }, {
            title: 'Deleted',
            url: '/folder/Archived',
            icon: 'archive'
        },

    ];
    public labels = ['Logout',];
    public is_auth_page = false;

    constructor(private platform : Platform, private splashScreen : SplashScreen, private statusBar : StatusBar) {
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
            this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
        }


        this.is_auth_page = ! path ? true : false;
        console.log(this.is_auth_page);

    }
}

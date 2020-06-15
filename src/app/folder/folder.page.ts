import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({ selector: 'app-folder', templateUrl: './folder.page.html', styleUrls: ['./folder.page.scss'] })
export class FolderPage implements OnInit {
  public folder: string;
  public path: string;
  public incidents;
  public selcted_incident;
  public reports;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.authService.get_incidents().subscribe(
      (res) => {
        this.incidents = res;
        console.log('incidents', res);
        this.showReport(this.incidents.data[0]);
      },
      (error) => console.log('incident error', error)
    );
  }

  showReport(incident) {
    console.log('clicked incident', incident);
    this.reports = incident.relationships.reports.data;
    this.selcted_incident = incident.id;
  }
}

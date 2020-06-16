import { map } from 'rxjs/operators';
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
  public attachment_array = [];
  public attachment;

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

    this.authService.get_attachment().subscribe((res) => {
      this.attachment = res;
      this.attachment.data.map((data) => {
        this.attachment_array[data.relationships.reports.data.id] = data.attributes.file;
      });
      console.log('attachment-array', this.attachment_array[2]);
    });
  }

  showReport(incident) {
    console.log('clicked incident', incident);
    //this.reports = incident.relationships.reports.data;
    this.selcted_incident = incident.id;
    this.reports = this.incidents.included.filter((report) => {
      return incident.id == report.relationships.incident.data.id;
    });
    console.log('reports', this.reports);
  }

  formatDate(date) {
    return new Date(date).toDateString() + ' ' + new Date(date).toLocaleTimeString();
  }
}

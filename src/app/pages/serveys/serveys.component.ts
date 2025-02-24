import { Component, OnInit } from '@angular/core';
import { ServeysService } from 'app/services/serveys.service';

@Component({
  selector: 'app-serveys',
  templateUrl: './serveys.component.html',
  styleUrls: ['./serveys.component.css']
})
export class ServeysComponent implements OnInit {

  list: any[] = [];

  constructor(private serveysService: ServeysService) {

  }

  ngOnInit(): void {
    this.getData()
  }


  getData() {
    this.serveysService.findAll().subscribe((data: any) => {
      this.list = data.data
    });
  }

  dateFormat(date:string){
    let fecha = new Date(date);    
    return `${fecha.getFullYear()}-${fecha.getMonth()+1}-${fecha.getDate()}`;
  }


}

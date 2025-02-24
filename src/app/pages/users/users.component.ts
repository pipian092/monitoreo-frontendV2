import { Component, OnInit } from '@angular/core';
import { UsersService } from 'app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  data: any[] = [];
  currenUser: any;

  constructor(private userService: UsersService) {

  }
  ngOnInit(): void {
    this.getUsers();
  }


  getUsers() {

    this.userService.findAll().subscribe((resp: any) => {
      this.data = resp.data;
    });
  }

}

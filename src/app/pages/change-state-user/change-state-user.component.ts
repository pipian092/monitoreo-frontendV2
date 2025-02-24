import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { successAlert } from 'app/helpers/sweetalert';
import { UsersService } from 'app/services/users.service';

@Component({
  selector: 'app-change-state-user',
  templateUrl: './change-state-user.component.html',
  styleUrls: ['./change-state-user.component.css']
})
export class ChangeStateUserComponent implements OnInit {

  userId: number = 0;
  loading: boolean = true;
  formGruopUser: FormGroup;


  constructor(private userService: UsersService, private router: Router, private rutaActiva: ActivatedRoute) {

    this.userId = this.rutaActiva.snapshot.params.id;
  }
  ngOnInit(): void {
    this.getUser();
  }

  update() {

    this.userService.update(this.formGruopUser.value, this.userId).subscribe((resp) => {
      if (resp.ok) {
        successAlert("Exitoso", "Registro actualizado con éxito");
      }
    });

  }


  getUser() {
    this.userService.findOne(this.userId).subscribe((resp: any) => {

      const { data } = resp;

      this.formGruopUser = new FormGroup({
        firstName: new FormControl({ value: data.firstName, disabled: true }, Validators.required),
        lastName: new FormControl({ value: data.lastName, disabled: true }, Validators.required),
        userName: new FormControl({ value: data.userName, disabled: true }, Validators.required),
        email: new FormControl({ value: data.email, disabled: true }, Validators.required),
        active: new FormControl(data.active ? "true" : "false", Validators.required),
        password: new FormControl(""),
        confirmation: new FormControl(""),
      });

      this.loading = false;



    })
  }

}

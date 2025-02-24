import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { successAlert } from 'app/helpers/sweetalert';
import { QuestionService } from 'app/services/question.service';

@Component({
  selector: 'app-edite',
  templateUrl: './edite.component.html',
  styleUrls: ['./edite.component.css']
})
export class EditeComponent implements OnInit {

  formGrup: FormGroup;
  loading: boolean = true;
  questionId: number = 0;

  constructor(
    private questionService: QuestionService, private readonly router: Router, private rutaActiva: ActivatedRoute) {

    this.questionId = this.rutaActiva.snapshot.params.id;

  }
  ngOnInit(): void {
    this.getQuestion();


  }


  getQuestion() {
    this.questionService.findOne(this.questionId).subscribe((resp: any) => {

      this.formGrup = new FormGroup({
        description: new FormControl(resp.data.description, Validators.required),
        type: new FormControl(resp.data.type, [Validators.required, Validators.min(2)]),
        state: new FormControl(resp.data.state, [Validators.required, Validators.min(2)]),
        recommendation: new FormControl(resp.data.recommendation, [Validators.required, Validators.min(2)]),
        createdAt: new FormControl(''),
        updatedAt: new FormControl(''),
      });

      this.loading = false;
    });
  }

  update() {

    this.questionService.update(this.formGrup.value, this.questionId).subscribe((resp: any) => {

      if (resp.ok) {

        successAlert("Exitoso", "Registro actualizado con éxito");

        this.router.navigateByUrl("/maintenance");

      }


    });


  }

}

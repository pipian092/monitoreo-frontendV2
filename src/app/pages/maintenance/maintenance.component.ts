import { Component, OnInit } from '@angular/core';
import { Question } from 'app/interfaces/Question.interface';
import { QuestionService } from 'app/services/question.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.css']
})

export class MaintenanceComponent implements OnInit {
  questions: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {

    this.getQuestions();

  }


  getQuestions() {
    this.questionService.getAll().subscribe((resp: any) => {
      this.questions = resp.data;
    })
  }

}

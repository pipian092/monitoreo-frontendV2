import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dataExample } from 'app/helpers/formData';
import { successAlert } from 'app/helpers/sweetalert';
import { Community } from 'app/interfaces/Community.interface';
import { Department } from 'app/interfaces/Department.interface';
import { Municipality } from 'app/interfaces/Municipality.interface';
import { Question } from 'app/interfaces/Question.interface';
import { CommunitiesService } from 'app/services/communities.service';
import { DepartmentService } from 'app/services/department.service';
import { MunicipalitiesService } from 'app/services/municipalities.service';
import { PollService } from 'app/services/poll.service';
import { QuestionService } from 'app/services/question.service';
declare var $: any;

interface questionData {
    questionId: Number,
    descripcion: String,
    otherResponse: string,
    recommendation: Boolean,
    key: string,
    key2: string,
}

@Component({
    selector: 'app-monitoring',
    templateUrl: './monitoring.component.html',
    styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

    departments: Department[] = [];
    municipalities: Municipality[] = [];
    communities: Community[] = [];
    question: Question[] = [];
    dateMonitory: string = "";
    dataGroup: questionData[] = [];
    loadingQuestions: boolean = true;
    generalRecommendation: string = "";


    formPoll: FormGroup;

    communityId: number = 0;
    municipalityId: number = 0;
    departmentId: number = 0;

    constructor(
        private readonly deparmentService: DepartmentService,
        private readonly municipalitiesService: MunicipalitiesService,
        private readonly communitiesService: CommunitiesService,
        private readonly questionsService: QuestionService,
        private readonly pollservice: PollService,
        private formBuilder: FormBuilder,
        private router: Router
    ) {

    }

    ngOnInit() {

        this.dataGroup = dataExample;

        this.getDeparments();

        this.getQuestions();

    }


    getDeparments() {
        this.deparmentService.getAll().subscribe(((res: any) => {
            //console.log(res);
            this.departments = res.data;
        }));
    }

    getMunicipalitiesByDeparment(event: any) {
        let departmentId: number = event.target.value;
        this.communities = [];
        this.municipalities = [];

        this.departmentId = Number(departmentId);

        this.municipalitiesService.getByDepartmentId(departmentId).subscribe(((res: any) => {
            this.municipalities = res.data;
        }));
    }

    getMunicipalities(event: any) {
        let municipalityId: number = event.target.value;

        this.municipalityId = Number(municipalityId);

        this.communitiesService.getByCommunityByMunicipalityId(municipalityId).subscribe(((res: any) => {
            this.communities = res.data;
        }));
    }

    getQuestions() {
        this.questionsService.getAll().subscribe(((res: any) => {
            this.question = res.data;

            let data: questionData[] = [];
            let group: any = {};

            res.data.forEach((item: Question) => {

                if (item.state) {
                    data.push({
                        questionId: item.id,
                        descripcion: item.description,
                        otherResponse: "",
                        recommendation: item.recommendation,
                        key: "questions?" + item.id,
                        key2: "recommendations?" + item.id,
                    });
                }


            });



            this.dataGroup = data;

            data.forEach(question => {
                group[question.key] = new FormControl(false, Validators.required);

                if (question?.key2) {
                    group[question.key2] = new FormControl("", question.recommendation && Validators.required);
                }

            });

            this.formPoll = this.formBuilder.group(group);

            this.loadingQuestions = false;


        }));
    }

    save() {
        //console.log({ municipalityId: this.municipalityId, departmentId: this.departmentId, communityId: Number(this.communityId) });

        let req: any[] = [];

        this.dataGroup.forEach(element => {
            let questionId = Number(element.key.split('?')[1]);
            req.push({
                description: this.formPoll.get(element.key2).value,
                response: this.formPoll.get(element.key).value,
                QuestionId: questionId,
                CommunityId: Number(this.communityId)
            });
        });

        let body: any = {
            polls: req,
            survey: {
                recomendation: this.generalRecommendation,
                monitoringDate: '',
                communityId: Number(this.communityId)
            }
        };

        this.pollservice.bulkCreate(body).subscribe((res: any) => {

            if (res.ok) {
                successAlert('Exitoso', 'Registro guardado con exito');
                this.router.navigate(['/monitoring'])
            }

        });

    }

    inicializeProperteForm() {

        let data: questionData[] = [];

        this.question.forEach((item: Question) => {
            data.push({
                questionId: item.id,
                descripcion: item.description,
                otherResponse: "",
                recommendation: item.recommendation,
                key: "questions?" + item.id,
                key2: "recommendations?" + item.id,
            });
        });

        this.dataGroup = [...data];
    }

    toFormGroup() {
        const group: any = {};

        this.dataGroup.forEach(question => {
            group[question.key] = new FormControl(false, Validators.required);

            if (question?.key2) {
                group[question.key2] = new FormControl("", Validators.required);
            }

        });

        this.formPoll = this.formBuilder.group(group);
    }

    dateFormat(date: string) {

        let fecha = new Date(date);
        return `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;

    }

}

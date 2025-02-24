import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LbdModule } from '../lbd/lbd.module';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { DepartmentComponent } from '../pages/department/department.component';
import { MunicipalitiesComponent } from '../pages/municipalities/municipalities.component';
import { UsersComponent } from '../pages/users/users.component';
import { RolesComponent } from '../pages/roles/roles.component';
import { CommunitiesComponent } from '../pages/communities/communities.component';
import { MonitoringComponent } from '../pages/monitoring/monitoring.component';
import { MaintenanceComponent } from '../pages/maintenance/maintenance.component';
import { CreatePullComponent } from '../pages/create-pull/create-pull.component';
import { CreateQuestionComponent } from '../pages/create-question/create-question.component';
import { EditeQuestionComponent } from '../pages/edite-question/edite-question.component';
import { ServeysComponent } from '../pages/serveys/serveys.component';
import { MonitoringDetailComponent } from '../pages/monitoring-detail/monitoring-detail.component';
import { NewUsersComponent } from '../pages/new-users/new-users.component';
import { ChangeStateUserComponent } from '../pages/change-state-user/change-state-user.component';
import { EditeComponent } from '../pages/edite/edite.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        ReactiveFormsModule,
        LbdModule
    ],
    declarations: [DashboardComponent, DepartmentComponent, MunicipalitiesComponent, UsersComponent, RolesComponent, CommunitiesComponent, MonitoringComponent, MaintenanceComponent, CreatePullComponent, CreateQuestionComponent, EditeQuestionComponent, ServeysComponent, MonitoringDetailComponent, NewUsersComponent, ChangeStateUserComponent, EditeComponent]
})

export class DashboardModule { }

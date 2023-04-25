import {Type} from '@angular/core';
import {MainPage} from "@modules/main/main.page";
import {NavbarMenuComponent} from "@modules/main/components/navbar-menu/navbar-menu.component";
import {DashboardPage} from "@modules/main/pages/dashboard/dashboard.page";
import {ExamPage} from "@modules/main/pages/exam/exam.page";
import {HomeworkPage} from "@modules/main/pages/homework/homework.page";
import {TutorialPage} from "@modules/main/pages/tutorial/tutorial.page";
import {FigureComponent} from "@modules/main/components/figure/figure.component";
import {ProfilePage} from "@modules/main/pages/profile/profile.page";
import {ProfileEditPage} from "@modules/main/pages/profile-edit/profile-edit.page";
import {ActivityPage} from "@modules/main/pages/activity/activity.page";
import {ExamDetailsPage} from "@modules/main/pages/exam-details/exam-details.page";
import {HomeworkDetailsPage} from "@modules/main/pages/homework-details/homework-details.page";
import {TutorialDetailsPage} from "@modules/main/pages/tutorial-details/tutorial-details.page";
import {ActivityDetailsPage} from "@modules/main/pages/activity-details/activity-details.page";

export const COMPONENTS: Type<any>[] = [
  NavbarMenuComponent,
  FigureComponent,
  MainPage,
  ProfilePage,
  ProfileEditPage,
  DashboardPage,
  ExamPage,
  ExamDetailsPage,
  HomeworkPage,
  HomeworkDetailsPage,
  TutorialPage,
  TutorialDetailsPage,
  ActivityPage,
  ActivityDetailsPage
];

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MainPage} from './main.page';
import {DashboardPage} from "@modules/main/pages/dashboard/dashboard.page";
import {ExamPage} from "@modules/main/pages/exam/exam.page";
import {HomeworkPage} from "@modules/main/pages/homework/homework.page";
import {TutorialPage} from "@modules/main/pages/tutorial/tutorial.page";
import {ProfilePage} from "@modules/main/pages/profile/profile.page";
import {ProfileEditPage} from "@modules/main/pages/profile-edit/profile-edit.page";
import {UserDataGuard} from "@core/guard/user-data.guard";
import {ActivityPage} from "@modules/main/pages/activity/activity.page";
import {ExamDetailsPage} from "@modules/main/pages/exam-details/exam-details.page";
import {HomeworkDetailsPage} from "@modules/main/pages/homework-details/homework-details.page";
import {TutorialDetailsPage} from "@modules/main/pages/tutorial-details/tutorial-details.page";
import {ActivityDetailsPage} from "@modules/main/pages/activity-details/activity-details.page";

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    canActivate: [UserDataGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardPage,
        title: 'داشبورد'
      },
      {
        path: 'exam',
        children: [
          {
            path: '',
            component: ExamPage,
            title: 'آزمون'
          },
          {
            path: ':id',
            component: ExamDetailsPage,
            title: 'جزئیات آزمون'
          },
        ]
      },
      {
        path: 'homework',
        children: [
          {
            path: '',
            component: HomeworkPage,
            title: 'تکلیف'
          },
          {
            path: ':id',
            component: HomeworkDetailsPage,
            title: 'جزئیات تکلیف'
          },
        ]
      },
      {
        path: 'tutorial',
        children: [
          {
            path: '',
            component: TutorialPage,
            title: 'درسنامه'
          },
          {
            path: ':id',
            component: TutorialDetailsPage,
            title: 'جزئیات درسنامه'
          },
        ]
      },
      {
        path: 'activity',
        children: [
          {
            path: '',
            component: ActivityPage,
            title: 'دفتر معلم'
          },
          {
            path: ':id',
            component: ActivityDetailsPage,
            title: 'جزئیات دفتر معلم'
          },
        ]
      },
      {
        path: 'profile',
        component: ProfilePage,
        title: 'پروفایل'
      },
      {
        path: 'profile-edit',
        component: ProfileEditPage,
        title: 'ویرایش پروفایل'
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/404'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {
}

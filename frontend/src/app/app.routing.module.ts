import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {EditQuizComponent} from './quizzes/edit-quiz-component/edit-quiz.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {SelectQuizPlayerComponent} from './select-quiz-player/select-quiz-player.component';
import {CreationModifQuiz} from './quizzes/creation-modif-quiz/creation-modif-quiz';
import {QuizFormComponent} from './quizzes/quiz-form/quiz-form.component';

import {AuthGuard} from './auth.guard';
import {CreatePlayerComponent} from './create-player/create-player.component';
import {QuizGameComponent} from './quiz-game/quiz-game.component';
import {ResultatsComponent} from './resultats/resultats.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'gestion', component: CreationModifQuiz, canActivate: [AuthGuard] },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'resultats', component: ResultatsComponent , canActivate: [AuthGuard]},
  {path: 'modif-quiz', component: QuizListComponent , canActivate: [AuthGuard]},
  {path: 'quiz-form', component: QuizFormComponent , canActivate: [AuthGuard]},
  {path: 'edit-quiz/:id', component: EditQuizComponent , canActivate: [AuthGuard]},
  {path: 'select-quiz-player', component: SelectQuizPlayerComponent, canActivate: [AuthGuard] },
  {path: 'select-quiz-player/createNewPlayer', component: CreatePlayerComponent, canActivate: [AuthGuard] },
  {path: 'select-quiz-player/:id', component: QuizGameComponent, canActivate: [AuthGuard] },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

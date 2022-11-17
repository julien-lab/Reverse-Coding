import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

import {QuizService} from '../../../services/quiz.service';
import {Quiz} from '../../../models/quiz.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent {
  /**
   * QuizForm: Object which manages the form in our component.
   * More information about Reactive Forms: https://angular.io/guide/reactive-forms#step-1-creating-a-formgroup-instance
   */
  public quizForm: FormGroup;
  linkReturn = '/gestion';
  public THEME_LIST: string[] = ['Animaux', 'Auto,Moto', 'Cinéma', 'Célébrité', 'Géographie', 'Gastronomie', 'Histoire', 'Littérature', 'Musique', 'Nature', 'Santé', 'Sciences', 'Sport'];
  private error: string;
  constructor(public formBuilder: FormBuilder, private router: Router, public quizService: QuizService) {
    this.quizForm = this.formBuilder.group({
      name: [''],
      theme: [''],
      date: null
    });
  }

  addQuiz() {
    const quizToCreate: Quiz = this.quizForm.getRawValue() as Quiz;
    if ( quizToCreate.name !== '' && quizToCreate.theme !== '') {
      quizToCreate.date = new Date();
      quizToCreate.questions = [];
      this.quizService.addQuiz(quizToCreate);
      setTimeout(() => {
        this.router.navigate(['edit-quiz/' + quizToCreate.id]);
      }, 100);
    } else {
        this.error = 'Veuillez remplir tous les champs pour créer un quiz.';
    }
  }
}

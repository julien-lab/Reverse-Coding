import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Quiz} from '../../../models/quiz.model';
import {Question} from '../../../models/question.model';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  @Input()
  public quiz: Quiz;
  public questionForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public questionService: QuestionService) {
     this.initialiazeQuestionForm();
  }

  ngOnInit() {
  }

  private initialiazeQuestionForm() {
    this.questionForm = this.formBuilder.group({
      label: [''],
      answers: this.formBuilder.array([]),
      clue: [],
      timer: [3600]
    });
  }

  addQuestion() {
    const questionToCreate: Question = this.questionForm.getRawValue() as Question;
    questionToCreate.numero = this.quiz.questions.length + 1;
    if (questionToCreate.clue === null) {
        questionToCreate.clue = 'Pas d\'indice pour cette question.';
    }
    this.initialiazeQuestionForm();
    this.questionService.addQuestion(questionToCreate, this.quiz);
  }
}

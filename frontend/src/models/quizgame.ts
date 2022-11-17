import {Question} from './question.model';
import {Answer} from './answer.model';

export interface QuizGame {
  id?: number;
  quizId?: number;
  playerId?: number;
  nbWrongAnswer?: number;
  questionsFailed?: Question[];
  date?: Date;
  selectedAnswers?: Answer[];
}

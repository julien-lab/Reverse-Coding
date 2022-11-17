import { Answer } from './answer.model';

export interface Question {
    id: number;
    label: string;
    numero: number;
    answers: Answer[];
    quizId: number;
    clue?: string;
    timer?: number;
}

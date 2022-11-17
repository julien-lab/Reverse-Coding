export interface Answer {
  id: number;
  type?: string;
  value: string;
  isCorrect: boolean;
  questionId: number;
}

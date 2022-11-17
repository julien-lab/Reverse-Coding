const { Player, User, Quiz,Question, Answer, QuizGame } = require('../models')

function associateAllPlayersQuizzes() {
    const users = User.get();
    const players = Player.get();
    const quizzes = Quiz.get();
    const usersWithPlayers = users.map((user) => {
        return {...user, players: players.filter((player) =>
                player.userId === user.id,
            ), quizzes: quizzes.filter((quiz) =>
                quiz.userId === user.id,
            )}
    });

    usersWithPlayers.forEach((user) => {
        user.quizzes = user.quizzes.map((quiz) => {
            return associateQuestions(quiz.id)
        })
    })

    return usersWithPlayers
}

function associatePlayersQuizzes(userId) {
    const user = User.getById(userId)
    const players = Player.get();
    const quizzes = Quiz.get();
    const userWithPlayers =  {...user, players: players.filter((player) =>
            player.userId === user.id
        ), quizzes: quizzes.filter((quiz) =>
            quiz.userId === user.id,
        )};

    userWithPlayers.quizzes = userWithPlayers.quizzes.map((quiz) => {
        return associateQuestions(quiz.id)
    })

    return userWithPlayers;
}

function associateAllQuestions() {
    const quizzes = Quiz.get();
    const questions = Question.get();
    const quizzesWithQuestions = quizzes.map((quiz) => {
        return {...quiz, questions: questions.filter((question) =>
                question.quizId === quiz.id
            )}
    });

    quizzesWithQuestions.forEach((quiz) => {
        quiz.questions = quiz.questions.map((question) => {
            return associateAnswers(question.id)
        })
    })

    return quizzesWithQuestions;
}

function associateQuestions(quizId) {
    const quiz = Quiz.getById(quizId)
    const questions = Question.get();
    const quizWithQuestions =  {...quiz, questions: questions.filter((question) =>
            question.quizId === quiz.id
        )};

    quizWithQuestions.questions = quizWithQuestions.questions.map((question) => {
        return associateAnswers(question.id)
    })

    return quizWithQuestions;
}

function associateAllAnswers() {
    const questions = Question.get();
    const answers = Answer.get();
    const questionsWithAnswers = questions.map((question) => {
        return {...question, answers: answers.filter((answer) =>
                answer.questionId === question.id
            )}
    });
    return questionsWithAnswers;
}

function associateAnswers(questionId) {
    const question = Question.getById(questionId)
    const answers = Answer.get();
    return {...question, answers : answers.filter((answer) =>
            answer.questionId === question.id
        )};
}

function associateAllQuizGames(userId) {
    const players = Player.get().filter((player) => player.userId === parseInt(userId));
    const quizgames = QuizGame.get();
    return players.map((player) => {
        return {
            ...player, quizGames: quizgames.filter((quizGame) =>
                quizGame.playerId === player.id
            )
        }
    });
}

function associateQuizGames(playerId) {
    const player = Player.getById(playerId)
    const quizgames = QuizGame.get()
    return {...player, quizGames : quizgames.filter((quizgame) =>
            quizgame.playerId === player.id
        )};
}


module.exports = {
    associateAllPlayersQuizzes,
    associatePlayersQuizzes,
    associateAllQuestions,
    associateQuestions,
    associateAllAnswers,
    associateAnswers,
    associateAllQuizGames,
    associateQuizGames,
}

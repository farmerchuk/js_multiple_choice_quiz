var quiz = {
  questions: [
    {
      id: 1,
      description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
      options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein']
    },
    {
      id: 2,
      description: 'Which of the following numbers is the answer to Life, the \
                    universe and everything?',
      options: ['66', '13', '111', '42']
    },
    {
      id: 3,
      description: 'What is Pan Galactic Gargle Blaster?',
      options: ['A drink', 'A machine', 'A creature', 'None of the above']
    },
    {
      id: 4,
      description: 'Which star system does Ford Prefect belong to?',
      options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri']
    }
  ],

  answerKey: {
    '1': 'Douglas Adams',
    '2': '42',
    '3': 'A drink',
    '4': 'Betelgeuse'
  },

  renderQuizHtml: function() {
    var questionListTemplate = Handlebars.compile($('#questionListTemplate').html());
    $('#questions').html(questionListTemplate({ questions: this.questions }));
  },

  bindEvents: function() {
    this.bindFormSubmit();
    this.bindFormReset();
  },

  bindFormSubmit: function() {
    $('form').on('submit', function(e) {
      e.preventDefault();
      this.markAnswers();
      this.disableSubmit();
    }.bind(this));
  },

  markAnswers: function() {
    var answers = this.getFormAnswers();

    answers.forEach(function(answer, idx) {
      var key = String(idx + 1);

      if (!answer) {
        this.renderAnswerResult(key, 'answer-missing');
      } else if (this.answerKey[key] === answer) {
        this.renderAnswerResult(key, 'answer-correct');
      } else if (this.answerKey[key] !== answer) {
        this.renderAnswerResult(key, 'answer-wrong');
      }
    }.bind(this));
  },

  disableSubmit: function() {
    $('button[name="submit"]').attr('disabled', 'disabled');
  },

  enableSubmit: function() {
    $('button[name="submit"]').removeAttr('disabled');
  },

  getFormAnswers: function() {
    var $questions = $('li[class^="question"]');
    var questionsArray = Array.prototype.slice.call($questions);

    return questionsArray.map(function(question) {
      return $(question).find('input:checked').val();
    });
  },

  renderAnswerResult: function(key, result) {
    var answer = this.answerKey[key];
    var $result = $('.result-' + key);

    $result.find('.' + result).css('display', 'block');

    if (result !== 'answer-correct') {
      $result.find('.correct-answer').html(answer);
      $result.find('.correct-answer').css('display', 'inline');
    }
  },

  bindFormReset: function() {
    $('form').on('reset', function(e) {
      this.enableSubmit();
      this.hideAnswerResults();
    }.bind(this));
  },

  hideAnswerResults: function() {
    $('div[class^="result"] p').css('display', 'none');
  },

  init: function() {
    this.renderQuizHtml();
    this.bindEvents();
  },
}

quiz.init();

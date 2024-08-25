import React, { useState } from "react";
import { Card, Button, Radio, message, Row, Col } from "antd";
import "./Quiz.css";
import quizIllustration from "../../assets/Online test-rafiki.svg"; 
import resultIllustration from "../../assets/Winners-rafiki.svg";

const quizQuestions = [
  {
    question: "What is the primary purpose of a budget?",
    options: [
      "To keep track of spending habits",
      "To minimize spending on unnecessary items",
      "To allocate money for savings and expenses",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    question: "What is an emergency fund?",
    options: [
      "Money set aside for unplanned expenses",
      "A fund used to buy luxury items",
      "Money for planned vacations",
      "None of the above",
    ],
    answer: "Money set aside for unplanned expenses",
  },
  // Add more questions as needed
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption === null) {
      message.warning("Please select an option!");
      return;
    }

    if (selectedOption === quizQuestions[currentQuestion].answer) {
      setScore(score + 1);
      message.success("Correct Answer!");
    } else {
      message.error("Incorrect Answer!");
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
  };

  return (
    
    <div className="quiz-container">
      {showResults ? (
        <Card className="score-card">
            <Col span={8}>
            <img
              src={resultIllustration}
              alt="Result Illustration"
              className="quiz-illustration"
            />
          </Col>
            
            <Col span={8}>
          <h2>Your Score: {score} / {quizQuestions.length}</h2>
          <Button type="primary" onClick={handleRetakeQuiz}>
            Retake Quiz
          </Button></Col>
        </Card>
      ) : (
        <Row className="quiz-row">
          <Col span={12} className="quiz-illustration-col">
            <img
              src={quizIllustration}
              alt="Quiz Illustration"
              className="quiz-illustration"
            />
          </Col>
          <Col span={12} className="quiz-question-col">

            <Card className="quiz-card">
            <h1 className = "quiz-heading">Financial Quiz</h1>

              <h2>{quizQuestions[currentQuestion].question}</h2>
              <Radio.Group
                onChange={handleOptionChange}
                value={selectedOption}
                className="quiz-options-group"
              >
                {quizQuestions[currentQuestion].options.map((option, index) => (
                  <Radio key={index} value={option}>
                    {option}
                  </Radio>
                ))}
              </Radio.Group>
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default Quiz;

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, CheckCircle, XCircle, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizInterfaceProps {
  quizId: string;
  onComplete: (score: number, coinsEarned: number) => void;
  onExit: () => void;
}

// Mock quiz data
const mockQuizzes: Record<string, { title: string; questions: Question[]; coinReward: number }> = {
  "climate-basics": {
    title: "Climate Change Basics",
    coinReward: 25,
    questions: [
      {
        id: "1",
        question: "What is the main cause of climate change?",
        options: [
          "Natural weather patterns",
          "Greenhouse gas emissions from human activities",
          "Solar radiation changes",
          "Ocean currents"
        ],
        correctAnswer: 1,
        explanation: "Human activities, especially burning fossil fuels, release greenhouse gases that trap heat in the atmosphere."
      },
      {
        id: "2",
        question: "Which gas contributes most to global warming?",
        options: [
          "Oxygen",
          "Nitrogen",
          "Carbon dioxide",
          "Hydrogen"
        ],
        correctAnswer: 2,
        explanation: "Carbon dioxide (CO2) is the primary greenhouse gas responsible for global warming."
      },
      {
        id: "3",
        question: "What can individuals do to reduce their carbon footprint?",
        options: [
          "Use public transportation",
          "Reduce energy consumption",
          "Choose renewable energy",
          "All of the above"
        ],
        correctAnswer: 3,
        explanation: "All these actions help reduce individual carbon footprints and contribute to fighting climate change."
      }
    ]
  }
};

export function QuizInterface({ quizId, onComplete, onExit }: QuizInterfaceProps) {
  const quiz = mockQuizzes[quizId];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showExplanation) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleAnswerSubmit();
    }
  }, [timeLeft, showExplanation]);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < quiz.questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(30);
    } else {
      // Quiz completed
      const finalScore = score + (selectedAnswer === quiz.questions[currentQuestion].correctAnswer ? 1 : 0);
      const percentage = (finalScore / quiz.questions.length) * 100;
      const coinsEarned = Math.round((percentage / 100) * quiz.coinReward);
      setQuizCompleted(true);
      setTimeout(() => onComplete(finalScore, coinsEarned), 2000);
    }
  };

  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  if (quizCompleted) {
    const finalScore = score + (selectedAnswer === quiz.questions[currentQuestion].correctAnswer ? 1 : 0);
    const percentage = (finalScore / quiz.questions.length) * 100;
    const coinsEarned = Math.round((percentage / 100) * quiz.coinReward);
    
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="text-center py-8">
            <div className="mb-6">
              <Award className="w-16 h-16 text-eco-coin mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-primary mb-2">Quiz Complete! 🎉</h2>
              <p className="text-xl text-muted-foreground mb-4">
                You scored {finalScore}/{quiz.questions.length} ({percentage.toFixed(0)}%)
              </p>
              <div className="bg-gradient-coin text-white px-6 py-3 rounded-full font-bold text-xl inline-block">
                +{coinsEarned} Eco-Coins Earned!
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">{quiz.title}</h1>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </p>
          </div>
          <Button variant="outline" onClick={onExit}>
            Exit Quiz
          </Button>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Timer */}
        <Card className={cn(
          "transition-colors",
          timeLeft <= 10 ? "border-destructive" : "border-border"
        )}>
          <CardContent className="py-4">
            <div className="flex items-center justify-center gap-2">
              <Clock className={cn(
                "w-5 h-5",
                timeLeft <= 10 ? "text-destructive" : "text-muted-foreground"
              )} />
              <span className={cn(
                "text-2xl font-bold",
                timeLeft <= 10 ? "text-destructive" : "text-foreground"
              )}>
                {timeLeft}s
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Question */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className={cn(
                  "w-full justify-start text-left h-auto p-4",
                  showExplanation && index === question.correctAnswer && "bg-leaf-green text-white",
                  showExplanation && selectedAnswer === index && index !== question.correctAnswer && "bg-destructive text-white"
                )}
                onClick={() => !showExplanation && setSelectedAnswer(index)}
                disabled={showExplanation}
              >
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span>{option}</span>
                  {showExplanation && index === question.correctAnswer && (
                    <CheckCircle className="w-5 h-5 ml-auto" />
                  )}
                  {showExplanation && selectedAnswer === index && index !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 ml-auto" />
                  )}
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Explanation */}
        {showExplanation && (
          <Card className="bg-muted">
            <CardHeader>
              <CardTitle className="text-lg">Explanation</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{question.explanation}</p>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <div></div>
          {!showExplanation ? (
            <Button
              onClick={handleAnswerSubmit}
              disabled={selectedAnswer === null}
              variant="quiz"
            >
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} variant="nature">
              {currentQuestion + 1 < quiz.questions.length ? "Next Question" : "Finish Quiz"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
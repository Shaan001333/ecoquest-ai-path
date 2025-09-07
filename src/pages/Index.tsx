import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { StudentDashboard } from "@/components/StudentDashboard";
import { QuizInterface } from "@/components/QuizInterface";
import { Leaderboard } from "@/components/Leaderboard";

type AppView = "login" | "dashboard" | "quiz" | "leaderboard" | "missions";

const Index = () => {
  const [currentView, setCurrentView] = useState<AppView>("login");
  const [currentQuiz, setCurrentQuiz] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    email: "",
    role: "student" as "student" | "teacher",
    name: "Alex Student",
    coins: 120
  });

  const handleLogin = (email: string, role: "student" | "teacher") => {
    setUserData({ ...userData, email, role });
    setCurrentView("dashboard");
  };

  const handleStartQuiz = (quizId: string) => {
    setCurrentQuiz(quizId);
    setCurrentView("quiz");
  };

  const handleQuizComplete = (score: number, coinsEarned: number) => {
    setUserData({ ...userData, coins: userData.coins + coinsEarned });
    setCurrentView("dashboard");
    setCurrentQuiz(null);
  };

  const handleViewLeaderboard = () => {
    setCurrentView("leaderboard");
  };

  const handleViewMissions = () => {
    // Placeholder for missions view
    alert("Missions & Badges feature coming soon! 🏆");
  };

  const handleBackToDashboard = () => {
    setCurrentView("dashboard");
  };

  if (currentView === "login") {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (currentView === "quiz" && currentQuiz) {
    return (
      <QuizInterface
        quizId={currentQuiz}
        onComplete={handleQuizComplete}
        onExit={handleBackToDashboard}
      />
    );
  }

  if (currentView === "leaderboard") {
    return (
      <Leaderboard
        currentUserCoins={userData.coins}
        onBack={handleBackToDashboard}
      />
    );
  }

  // Default to dashboard
  return (
    <StudentDashboard
      studentName={userData.name}
      coins={userData.coins}
      onStartQuiz={handleStartQuiz}
      onViewLeaderboard={handleViewLeaderboard}
      onViewMissions={handleViewMissions}
    />
  );
};

export default Index;

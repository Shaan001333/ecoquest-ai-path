import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinCounter } from "./CoinCounter";
import { EcoTree } from "./EcoTree";
import { QuizCard } from "./QuizCard";
import { Trophy, Target, Zap, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentDashboardProps {
  studentName: string;
  coins: number;
  onStartQuiz: (quizId: string) => void;
  onViewLeaderboard: () => void;
  onViewMissions: () => void;
}

// Mock data for available quizzes
const availableQuizzes = [
  {
    id: "climate-basics",
    title: "Climate Change Basics",
    description: "Learn about greenhouse gases and global warming",
    timeMinutes: 5,
    coinReward: 25,
    difficulty: "easy" as const
  },
  {
    id: "renewable-energy",
    title: "Renewable Energy",
    description: "Explore solar, wind, and other clean energy sources",
    timeMinutes: 8,
    coinReward: 40,
    difficulty: "medium" as const
  },
  {
    id: "biodiversity",
    title: "Protecting Biodiversity",
    description: "Understanding ecosystems and conservation",
    timeMinutes: 10,
    coinReward: 50,
    difficulty: "hard" as const
  }
];

export function StudentDashboard({ 
  studentName, 
  coins, 
  onStartQuiz, 
  onViewLeaderboard, 
  onViewMissions 
}: StudentDashboardProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Welcome back, {studentName}! 🌱</h1>
          <p className="text-muted-foreground">Ready to save the planet?</p>
        </div>
        <CoinCounter coins={coins} showAnimation />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tree Progress */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Your Eco-Tree
            </CardTitle>
            <CardDescription>
              Your tree grows with every eco-coin earned!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EcoTree coins={coins} />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
            <CardDescription>
              Jump into learning and earning eco-coins
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              variant="nature" 
              size="lg" 
              onClick={onViewLeaderboard}
              className="h-20 flex-col gap-2"
            >
              <Trophy className="w-6 h-6" />
              <span>Leaderboard</span>
            </Button>
            <Button 
              variant="earth" 
              size="lg" 
              onClick={onViewMissions}
              className="h-20 flex-col gap-2"
            >
              <Target className="w-6 h-6" />
              <span>Missions & Badges</span>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Available Quizzes */}
      <div>
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <Users className="w-6 h-6" />
          Available Quizzes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              title={quiz.title}
              description={quiz.description}
              timeMinutes={quiz.timeMinutes}
              coinReward={quiz.coinReward}
              difficulty={quiz.difficulty}
              onStart={() => onStartQuiz(quiz.id)}
            />
          ))}
        </div>
      </div>

      {/* AI Recommendations (Placeholder) */}
      <Card className="bg-gradient-sky text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            AI Recommendations (Coming Soon!)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="opacity-90 mb-4">
            Our AI will soon suggest personalized quizzes and learning paths based on your progress!
          </p>
          <Button variant="secondary" disabled>
            Get AI Suggestions
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
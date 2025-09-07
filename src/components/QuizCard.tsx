import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Award, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuizCardProps {
  title: string;
  description: string;
  timeMinutes: number;
  coinReward: number;
  difficulty: "easy" | "medium" | "hard";
  onStart: () => void;
  className?: string;
}

export function QuizCard({ 
  title, 
  description, 
  timeMinutes, 
  coinReward, 
  difficulty, 
  onStart, 
  className 
}: QuizCardProps) {
  const difficultyColors = {
    easy: "bg-leaf-green",
    medium: "bg-warning",
    hard: "bg-destructive"
  };

  return (
    <Card className={cn("hover:shadow-nature transition-all duration-300 hover:scale-105", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-primary">{title}</CardTitle>
            <CardDescription className="mt-1">{description}</CardDescription>
          </div>
          <div className={cn(
            "px-2 py-1 rounded-full text-xs font-bold text-white",
            difficultyColors[difficulty]
          )}>
            {difficulty.toUpperCase()}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{timeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="w-4 h-4 text-eco-coin" />
            <span className="font-bold text-eco-coin">+{coinReward} coins</span>
          </div>
        </div>
        
        <Button 
          onClick={onStart}
          variant="quiz"
          className="w-full font-bold"
        >
          <TreePine className="w-4 h-4" />
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
}
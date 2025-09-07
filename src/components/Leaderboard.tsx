import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CoinCounter } from "./CoinCounter";
import { Trophy, Medal, Award, Crown, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardEntry {
  rank: number;
  name: string;
  coins: number;
  school: string;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  currentUserCoins: number;
  onBack: () => void;
}

// Mock leaderboard data
const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Emma Chen", coins: 1250, school: "Green Valley High" },
  { rank: 2, name: "Alex Rodriguez", coins: 1180, school: "Eco Academy" },
  { rank: 3, name: "Sophia Kim", coins: 950, school: "Nature's Way School" },
  { rank: 4, name: "Marcus Johnson", coins: 875, school: "Green Valley High" },
  { rank: 5, name: "You", coins: 120, school: "Green Valley High", isCurrentUser: true },
  { rank: 6, name: "Isabella Garcia", coins: 750, school: "Eco Academy" },
  { rank: 7, name: "Ethan Brown", coins: 680, school: "Nature's Way School" },
  { rank: 8, name: "Ava Wilson", coins: 620, school: "Green Valley High" },
];

export function Leaderboard({ currentUserCoins, onBack }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-badge-gold" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <Trophy className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRankStyle = (rank: number, isCurrentUser: boolean) => {
    if (isCurrentUser) {
      return "bg-gradient-nature text-white";
    }
    
    switch (rank) {
      case 1:
        return "bg-gradient-coin text-white";
      case 2:
        return "bg-gray-100 border-gray-300";
      case 3:
        return "bg-amber-50 border-amber-300";
      default:
        return "bg-card border-border";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
                <Trophy className="w-8 h-8 text-badge-gold" />
                Leaderboard
              </h1>
              <p className="text-muted-foreground">See how you rank against other eco-warriors!</p>
            </div>
          </div>
          <CoinCounter coins={currentUserCoins} />
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {mockLeaderboard.slice(0, 3).map((entry, index) => (
            <Card key={entry.name} className={cn(
              "text-center transition-all duration-300 hover:scale-105",
              index === 0 ? "order-2 scale-110" : index === 1 ? "order-1" : "order-3"
            )}>
              <CardContent className="py-6">
                <div className="mb-4">
                  {getRankIcon(entry.rank)}
                </div>
                <h3 className="font-bold text-lg">{entry.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{entry.school}</p>
                <div className="bg-gradient-coin text-white px-3 py-1 rounded-full text-sm font-bold">
                  {entry.coins.toLocaleString()} coins
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Complete Rankings</CardTitle>
            <CardDescription>All students from your school and beyond</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockLeaderboard.map((entry) => (
                <div
                  key={`${entry.name}-${entry.rank}`}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-lg border transition-all duration-300",
                    getRankStyle(entry.rank, entry.isCurrentUser || false),
                    entry.isCurrentUser && "shadow-nature"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8">
                      {entry.rank <= 3 ? getRankIcon(entry.rank) : (
                        <span className="font-bold text-lg">#{entry.rank}</span>
                      )}
                    </div>
                    <div>
                      <h4 className={cn(
                        "font-bold",
                        entry.isCurrentUser ? "text-white" : "text-foreground"
                      )}>
                        {entry.name} {entry.isCurrentUser && "(You)"}
                      </h4>
                      <p className={cn(
                        "text-sm",
                        entry.isCurrentUser ? "text-white/80" : "text-muted-foreground"
                      )}>
                        {entry.school}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full font-bold",
                    entry.isCurrentUser ? "bg-white/20 text-white" : "bg-eco-coin/10 text-eco-coin"
                  )}>
                    <Trophy className="w-4 h-4" />
                    <span>{entry.coins.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievement Goals */}
        <Card className="bg-gradient-sky text-white">
          <CardHeader>
            <CardTitle>🎯 Next Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <Medal className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-bold">Top 3</h4>
                <p className="text-sm opacity-90">Reach the podium!</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <Crown className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-bold">School Champion</h4>
                <p className="text-sm opacity-90">Lead your school!</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <h4 className="font-bold">1000 Coins</h4>
                <p className="text-sm opacity-90">Join the elite!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
import { cn } from "@/lib/utils";
import treeSeed from "@/assets/tree-seed.png";
import treeSapling from "@/assets/tree-sapling.png";
import treeFull from "@/assets/tree-full.png";

interface EcoTreeProps {
  coins: number;
  className?: string;
}

export function EcoTree({ coins, className }: EcoTreeProps) {
  const getTreeStage = (coins: number) => {
    if (coins < 50) return { image: treeSeed, stage: "Seed", description: "Your journey begins!" };
    if (coins < 150) return { image: treeSapling, stage: "Sapling", description: "Growing strong!" };
    return { image: treeFull, stage: "Mighty Tree", description: "Fully grown!" };
  };

  const tree = getTreeStage(coins);
  const progress = Math.min((coins / 200) * 100, 100);

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="relative">
        <img 
          src={tree.image} 
          alt={`Tree stage: ${tree.stage}`}
          className="w-32 h-32 object-contain tree-grow"
        />
        <div className="absolute -top-2 -right-2 bg-badge-gold text-white text-xs px-2 py-1 rounded-full font-bold badge-glow">
          {tree.stage}
        </div>
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="font-bold text-lg text-primary">{tree.description}</h3>
        <div className="w-48 bg-progress-bg rounded-full h-2">
          <div 
            className="bg-gradient-nature h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          {coins}/200 coins to reach full growth
        </p>
      </div>
    </div>
  );
}
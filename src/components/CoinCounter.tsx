import { cn } from "@/lib/utils";
import { Coins } from "lucide-react";
import ecoCoin from "@/assets/eco-coin.png";

interface CoinCounterProps {
  coins: number;
  className?: string;
  showAnimation?: boolean;
}

export function CoinCounter({ coins, className, showAnimation = false }: CoinCounterProps) {
  return (
    <div className={cn(
      "flex items-center gap-2 bg-gradient-coin text-white px-4 py-2 rounded-full shadow-coin",
      showAnimation && "coin-bounce",
      className
    )}>
      <img 
        src={ecoCoin} 
        alt="Eco Coin" 
        className="w-6 h-6"
      />
      <span className="font-bold text-lg">{coins.toLocaleString()}</span>
      <span className="text-sm opacity-90">Eco-Coins</span>
    </div>
  );
}
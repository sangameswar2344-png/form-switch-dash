import { Button } from "@/components/ui/button";

interface GameUIProps {
  score: number;
  gameOver: boolean;
  gameStarted: boolean;
  onStart: () => void;
  onRestart: () => void;
}

export const GameUI = ({
  score,
  gameOver,
  gameStarted,
  onStart,
  onRestart,
}: GameUIProps) => {
  return (
    <>
      {/* Score display */}
      {gameStarted && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10">
          <div className="text-6xl font-bold text-foreground/20 tabular-nums">
            {score}
          </div>
        </div>
      )}

      {/* Instructions */}
      {gameStarted && !gameOver && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center z-10">
          <p className="text-sm text-muted-foreground mb-2">
            Click or press <kbd className="px-2 py-1 bg-muted rounded text-xs">SPACE</kbd> to switch forms
          </p>
          <p className="text-xs text-muted-foreground/60">
            Pass through obstacles in the opposite form
          </p>
        </div>
      )}

      {/* Start screen */}
      {!gameStarted && !gameOver && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-6xl font-bold mb-4">
              <span className="text-light-form">LIGHT</span>
              <span className="text-foreground/50"> & </span>
              <span className="text-shadow-form">SHADOW</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Switch between light and shadow forms to pass through obstacles.
              Light obstacles require shadow form, dark obstacles require light form.
            </p>
            <Button
              onClick={onStart}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_5px_hsl(var(--primary)/0.3)] transition-all duration-300 hover:shadow-[0_0_40px_8px_hsl(var(--primary)/0.5)]"
            >
              START GAME
            </Button>
            <p className="text-xs text-muted-foreground">
              Click anywhere or press SPACE to begin
            </p>
          </div>
        </div>
      )}

      {/* Game over screen */}
      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-background/80 backdrop-blur-sm">
          <div className="text-center space-y-6 animate-fade-in">
            <h2 className="text-5xl font-bold text-destructive mb-4">
              GAME OVER
            </h2>
            <div className="space-y-2">
              <p className="text-muted-foreground text-lg">Final Score</p>
              <p className="text-7xl font-bold text-foreground">{score}</p>
            </div>
            <Button
              onClick={onRestart}
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_5px_hsl(var(--primary)/0.3)] transition-all duration-300 hover:shadow-[0_0_40px_8px_hsl(var(--primary)/0.5)]"
            >
              PLAY AGAIN
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

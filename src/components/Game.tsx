import { useState, useEffect, useCallback } from "react";
import { Player } from "./Player";
import { Obstacle } from "./Obstacle";
import { GameUI } from "./GameUI";
import { useToast } from "@/hooks/use-toast";

export interface ObstacleType {
  id: number;
  x: number;
  type: "light" | "shadow";
}

export const Game = () => {
  const [playerForm, setPlayerForm] = useState<"light" | "shadow">("light");
  const [obstacles, setObstacles] = useState<ObstacleType[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const { toast } = useToast();

  const OBSTACLE_SPEED = 3;
  const OBSTACLE_SPAWN_INTERVAL = 2000;
  const PLAYER_X = 100;

  const toggleForm = useCallback(() => {
    if (!gameOver && gameStarted) {
      setPlayerForm((prev) => (prev === "light" ? "shadow" : "light"));
    }
  }, [gameOver, gameStarted]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setPlayerForm("light");
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setPlayerForm("light");
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (!gameStarted) {
          startGame();
        } else {
          toggleForm();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [toggleForm, gameStarted]);

  // Spawn obstacles
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const spawnObstacle = () => {
      const newObstacle: ObstacleType = {
        id: Date.now(),
        x: window.innerWidth,
        type: Math.random() > 0.5 ? "light" : "shadow",
      };
      setObstacles((prev) => [...prev, newObstacle]);
    };

    const interval = setInterval(spawnObstacle, OBSTACLE_SPAWN_INTERVAL);
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  // Move obstacles and check collisions
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = setInterval(() => {
      setObstacles((prev) => {
        const updated = prev.map((obs) => ({
          ...obs,
          x: obs.x - OBSTACLE_SPEED,
        }));

        // Check collisions
        const collision = updated.find((obs) => {
          const obstacleLeft = obs.x;
          const obstacleRight = obs.x + 60;
          const playerRight = PLAYER_X + 40;

          if (obstacleLeft < playerRight && obstacleRight > PLAYER_X) {
            // Collision detected - check if forms match
            if (
              (obs.type === "light" && playerForm === "light") ||
              (obs.type === "shadow" && playerForm === "shadow")
            ) {
              return true; // Hit wrong form
            }
          }
          return false;
        });

        if (collision) {
          setGameOver(true);
          toast({
            title: "Game Over!",
            description: `Your score: ${score}`,
            variant: "destructive",
          });
        }

        // Remove off-screen obstacles and increase score
        return updated.filter((obs) => {
          if (obs.x + 60 < 0) {
            setScore((s) => s + 1);
            return false;
          }
          return true;
        });
      });
    }, 16); // ~60 FPS

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, playerForm, score, toast, PLAYER_X]);

  return (
    <div
      className="relative w-full h-screen overflow-hidden bg-game-background cursor-pointer"
      onClick={gameStarted ? toggleForm : startGame}
    >
      <GameUI
        score={score}
        gameOver={gameOver}
        gameStarted={gameStarted}
        onStart={startGame}
        onRestart={resetGame}
      />

      {gameStarted && (
        <>
          <Player form={playerForm} x={PLAYER_X} />
          {obstacles.map((obstacle) => (
            <Obstacle key={obstacle.id} obstacle={obstacle} />
          ))}
        </>
      )}
    </div>
  );
};

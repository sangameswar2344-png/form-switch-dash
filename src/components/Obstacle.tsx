import { ObstacleType } from "./Game";

interface ObstacleProps {
  obstacle: ObstacleType;
}

export const Obstacle = ({ obstacle }: ObstacleProps) => {
  const isLight = obstacle.type === "light";

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 transition-opacity duration-300"
      style={{ left: `${obstacle.x}px` }}
    >
      {/* Obstacle body */}
      <div
        className={`w-16 h-32 rounded-lg transition-all duration-300 ${
          isLight
            ? "bg-obstacle-light border-2 border-light-form shadow-[0_0_20px_5px_hsl(var(--light-form)/0.3)]"
            : "bg-obstacle-shadow border-2 border-shadow-form shadow-[0_0_20px_5px_hsl(var(--shadow-form)/0.3)]"
        }`}
      >
        {/* Pattern lines */}
        <div className="w-full h-full flex flex-col justify-evenly p-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`w-full h-1 rounded-full ${
                isLight ? "bg-light-form/30" : "bg-shadow-form/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Type indicator */}
      <div
        className={`absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold ${
          isLight ? "text-light-form" : "text-shadow-form"
        }`}
      >
        {isLight ? "LIGHT" : "DARK"}
      </div>
    </div>
  );
};

interface PlayerProps {
  form: "light" | "shadow";
  x: number;
}

export const Player = ({ form, x }: PlayerProps) => {
  const isLight = form === "light";

  return (
    <div
      className="absolute top-1/2 -translate-y-1/2 transition-all duration-300"
      style={{ left: `${x}px` }}
    >
      {/* Player body */}
      <div
        className={`relative w-10 h-10 rounded-lg transition-all duration-300 ${
          isLight
            ? "bg-light-form shadow-[0_0_30px_10px_hsl(var(--light-glow))]"
            : "bg-shadow-form shadow-[0_0_30px_10px_hsl(var(--shadow-glow))]"
        }`}
      >
        {/* Glow effect */}
        <div
          className={`absolute inset-0 rounded-lg animate-pulse-glow ${
            isLight ? "bg-light-glow/20" : "bg-shadow-glow/20"
          }`}
        />
        
        {/* Inner core */}
        <div
          className={`absolute inset-2 rounded-md ${
            isLight ? "bg-light-glow" : "bg-shadow-glow"
          }`}
        />
      </div>

      {/* Form indicator */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-bold text-foreground/70 whitespace-nowrap">
        {isLight ? "LIGHT" : "SHADOW"}
      </div>
    </div>
  );
};

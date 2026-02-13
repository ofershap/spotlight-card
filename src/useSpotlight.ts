import { useCallback, useRef, useState } from "react";

export interface SpotlightOptions {
  size?: number;
  color?: string;
  opacity?: number;
  enabled?: boolean;
}

export interface SpotlightState {
  x: number;
  y: number;
  isHovered: boolean;
}

const DEFAULT_SIZE = 350;
const DEFAULT_COLOR = "255, 255, 255";
const DEFAULT_OPACITY = 0.15;

export function useSpotlight(options: SpotlightOptions = {}) {
  const {
    size = DEFAULT_SIZE,
    color = DEFAULT_COLOR,
    opacity = DEFAULT_OPACITY,
    enabled = true,
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<SpotlightState>({
    x: 0,
    y: 0,
    isHovered: false,
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!enabled || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setState({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        isHovered: true,
      });
    },
    [enabled],
  );

  const handleMouseEnter = useCallback(() => {
    if (!enabled) return;
    setState((prev) => ({ ...prev, isHovered: true }));
  }, [enabled]);

  const handleMouseLeave = useCallback(() => {
    setState((prev) => ({ ...prev, isHovered: false }));
  }, []);

  const spotlightStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    opacity: state.isHovered ? 1 : 0,
    transition: "opacity 0.3s ease",
    background: `radial-gradient(${size}px circle at ${state.x}px ${state.y}px, rgba(${color}, ${opacity}), transparent 80%)`,
  };

  return {
    containerRef,
    spotlightStyle,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
    state,
  };
}

import React from "react";
import { useSpotlight, type SpotlightOptions } from "./useSpotlight";

export interface SpotlightCardProps
  extends React.HTMLAttributes<HTMLDivElement>, SpotlightOptions {
  as?: React.ElementType;
}

export const SpotlightCard = React.forwardRef<
  HTMLDivElement,
  SpotlightCardProps
>(
  (
    {
      as: Component = "div",
      size,
      color,
      opacity,
      enabled,
      children,
      style,
      ...props
    },
    forwardedRef,
  ) => {
    const { containerRef, spotlightStyle, handlers } = useSpotlight({
      size,
      color,
      opacity,
      enabled,
    });

    const mergedRef = useMergedRef(containerRef, forwardedRef);

    return (
      <Component
        ref={mergedRef}
        style={{ position: "relative", overflow: "hidden", ...style }}
        {...handlers}
        {...props}
      >
        <div style={spotlightStyle} aria-hidden="true" />
        {children}
      </Component>
    );
  },
);

SpotlightCard.displayName = "SpotlightCard";

function useMergedRef<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return React.useCallback((node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref && typeof ref === "object") {
        (ref as React.MutableRefObject<T | null>).current = node;
      }
    }
  }, refs);
}

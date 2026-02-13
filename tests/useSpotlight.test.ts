import { describe, it, expect } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useSpotlight } from "../src/useSpotlight";

describe("useSpotlight", () => {
  it("returns initial state with isHovered false", () => {
    const { result } = renderHook(() => useSpotlight());
    expect(result.current.state.isHovered).toBe(false);
    expect(result.current.state.x).toBe(0);
    expect(result.current.state.y).toBe(0);
  });

  it("returns spotlight style with opacity 0 initially", () => {
    const { result } = renderHook(() => useSpotlight());
    expect(result.current.spotlightStyle.opacity).toBe(0);
  });

  it("returns handler functions", () => {
    const { result } = renderHook(() => useSpotlight());
    expect(typeof result.current.handlers.onMouseMove).toBe("function");
    expect(typeof result.current.handlers.onMouseEnter).toBe("function");
    expect(typeof result.current.handlers.onMouseLeave).toBe("function");
  });

  it("sets isHovered true on mouse enter", () => {
    const { result } = renderHook(() => useSpotlight());
    act(() => {
      result.current.handlers.onMouseEnter();
    });
    expect(result.current.state.isHovered).toBe(true);
  });

  it("sets isHovered false on mouse leave", () => {
    const { result } = renderHook(() => useSpotlight());
    act(() => {
      result.current.handlers.onMouseEnter();
    });
    act(() => {
      result.current.handlers.onMouseLeave();
    });
    expect(result.current.state.isHovered).toBe(false);
  });

  it("does not set isHovered when disabled", () => {
    const { result } = renderHook(() => useSpotlight({ enabled: false }));
    act(() => {
      result.current.handlers.onMouseEnter();
    });
    expect(result.current.state.isHovered).toBe(false);
  });

  it("uses custom size in gradient style", () => {
    const { result } = renderHook(() => useSpotlight({ size: 500 }));
    expect(result.current.spotlightStyle.background).toContain("500px");
  });

  it("uses custom color in gradient style", () => {
    const { result } = renderHook(() => useSpotlight({ color: "0, 100, 255" }));
    expect(result.current.spotlightStyle.background).toContain("0, 100, 255");
  });

  it("uses custom opacity in gradient style", () => {
    const { result } = renderHook(() => useSpotlight({ opacity: 0.5 }));
    expect(result.current.spotlightStyle.background).toContain("0.5");
  });
});

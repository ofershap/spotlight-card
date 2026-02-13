import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { SpotlightCard } from "../src/SpotlightCard";

describe("SpotlightCard", () => {
  it("renders children", () => {
    const { getByText } = render(<SpotlightCard>Hello</SpotlightCard>);
    expect(getByText("Hello")).toBeTruthy();
  });

  it("has relative positioning and overflow hidden", () => {
    const { container } = render(<SpotlightCard>Content</SpotlightCard>);
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.position).toBe("relative");
    expect(el.style.overflow).toBe("hidden");
  });

  it("renders spotlight overlay with aria-hidden", () => {
    const { container } = render(<SpotlightCard>Content</SpotlightCard>);
    const overlay = container.querySelector("[aria-hidden='true']");
    expect(overlay).toBeTruthy();
  });

  it("spotlight is invisible by default", () => {
    const { container } = render(<SpotlightCard>Content</SpotlightCard>);
    const overlay = container.querySelector(
      "[aria-hidden='true']",
    ) as HTMLElement;
    expect(overlay.style.opacity).toBe("0");
  });

  it("spotlight becomes visible on mouse enter", () => {
    const { container } = render(<SpotlightCard>Content</SpotlightCard>);
    const card = container.firstElementChild as HTMLElement;
    fireEvent.mouseEnter(card);
    const overlay = container.querySelector(
      "[aria-hidden='true']",
    ) as HTMLElement;
    expect(overlay.style.opacity).toBe("1");
  });

  it("spotlight hides on mouse leave", () => {
    const { container } = render(<SpotlightCard>Content</SpotlightCard>);
    const card = container.firstElementChild as HTMLElement;
    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    const overlay = container.querySelector(
      "[aria-hidden='true']",
    ) as HTMLElement;
    expect(overlay.style.opacity).toBe("0");
  });

  it("applies custom size to gradient", () => {
    const { container } = render(
      <SpotlightCard size={500}>Content</SpotlightCard>,
    );
    const card = container.firstElementChild as HTMLElement;
    fireEvent.mouseEnter(card);
    const overlay = container.querySelector(
      "[aria-hidden='true']",
    ) as HTMLElement;
    expect(overlay.style.background).toContain("500px");
  });

  it("applies custom color to gradient", () => {
    const { container } = render(
      <SpotlightCard color="0, 100, 255">Content</SpotlightCard>,
    );
    const card = container.firstElementChild as HTMLElement;
    fireEvent.mouseEnter(card);
    const overlay = container.querySelector(
      "[aria-hidden='true']",
    ) as HTMLElement;
    expect(overlay.style.background).toContain("0, 100, 255");
  });

  it("renders with custom element type", () => {
    const { container } = render(
      <SpotlightCard as="section">Content</SpotlightCard>,
    );
    expect(container.firstElementChild?.tagName).toBe("SECTION");
  });

  it("does not respond to mouse when disabled", () => {
    const { container } = render(
      <SpotlightCard enabled={false}>Content</SpotlightCard>,
    );
    const card = container.firstElementChild as HTMLElement;
    fireEvent.mouseEnter(card);
    const overlay = container.querySelector(
      "[aria-hidden='true']",
    ) as HTMLElement;
    expect(overlay.style.opacity).toBe("0");
  });

  it("merges custom style prop", () => {
    const { container } = render(
      <SpotlightCard style={{ borderRadius: "12px" }}>Content</SpotlightCard>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.style.borderRadius).toBe("12px");
    expect(el.style.position).toBe("relative");
  });

  it("passes through additional HTML attributes", () => {
    const { container } = render(
      <SpotlightCard data-testid="card" className="my-card">
        Content
      </SpotlightCard>,
    );
    const el = container.firstElementChild as HTMLElement;
    expect(el.getAttribute("data-testid")).toBe("card");
    expect(el.className).toBe("my-card");
  });
});

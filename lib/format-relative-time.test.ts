import { describe, it, expect } from "vitest";
import { formatRelativeTime } from "./format-relative-time";

describe("formatRelativeTime", () => {
  it("returns 'just now' for dates less than a minute ago", () => {
    const now = new Date();
    expect(formatRelativeTime(now.toISOString())).toBe("just now");
  });

  it("returns '1 minute ago' for dates 1 minute ago", () => {
    const date = new Date(Date.now() - 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 minute ago");
  });

  it("returns '5 minutes ago' for dates 5 minutes ago", () => {
    const date = new Date(Date.now() - 5 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("5 minutes ago");
  });

  it("returns '1 hour ago' for dates 1 hour ago", () => {
    const date = new Date(Date.now() - 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 hour ago");
  });

  it("returns '3 hours ago' for dates 3 hours ago", () => {
    const date = new Date(Date.now() - 3 * 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("3 hours ago");
  });

  it("returns '1 day ago' for dates 1 day ago", () => {
    const date = new Date(Date.now() - 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 day ago");
  });

  it("returns '5 days ago' for dates 5 days ago", () => {
    const date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("5 days ago");
  });

  it("returns '1 month ago' for dates 30 days ago", () => {
    const date = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 month ago");
  });

  it("returns '1 year ago' for dates 365 days ago", () => {
    const date = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
    expect(formatRelativeTime(date.toISOString())).toBe("1 year ago");
  });
});

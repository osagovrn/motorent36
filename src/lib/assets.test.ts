import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  normalizePublicPath,
  resolveAbsoluteAssetUrl,
  resolveAssetUrl,
} from "./assets.ts";

describe("normalizePublicPath", () => {
  it("adds leading slash", () => {
    assert.equal(normalizePublicPath("icon.svg"), "/icon.svg");
  });

  it("keeps absolute http(s)", () => {
    assert.equal(
      normalizePublicPath("https://cdn.example/a.jpg"),
      "https://cdn.example/a.jpg",
    );
  });
});

describe("resolveAssetUrl", () => {
  it("uses siteUrl on production host", () => {
    assert.equal(
      resolveAssetUrl("/products/a.jpg", {
        basePath: "",
        siteUrl: "https://beri36.ru",
      }),
      "https://beri36.ru/products/a.jpg",
    );
  });

  it("uses basePath on localhost", () => {
    assert.equal(
      resolveAssetUrl("/icon.svg", {
        basePath: "/motorent36",
        siteUrl: "http://localhost:3000",
      }),
      "/motorent36/icon.svg",
    );
  });

  it("returns relative path without basePath locally", () => {
    assert.equal(
      resolveAssetUrl("/icon.svg", {
        basePath: "",
        siteUrl: "http://localhost:3000",
      }),
      "/icon.svg",
    );
  });

  it("passes through remote urls", () => {
    assert.equal(
      resolveAssetUrl("https://cdn.example/x.png", {
        basePath: "",
        siteUrl: "https://beri36.ru",
      }),
      "https://cdn.example/x.png",
    );
  });
});

describe("resolveAbsoluteAssetUrl", () => {
  it("joins siteUrl and path", () => {
    assert.equal(
      resolveAbsoluteAssetUrl("/products/a.jpg", "https://beri36.ru"),
      "https://beri36.ru/products/a.jpg",
    );
  });
});

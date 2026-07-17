import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  calculateRental,
  formatDaysLabel,
  formatRub,
  parseLocalDate,
  rentalDays,
} from "./rental.ts";

describe("parseLocalDate", () => {
  it("parses YYYY-MM-DD as local calendar day", () => {
    const d = parseLocalDate("2026-07-17");
    assert.equal(d.getFullYear(), 2026);
    assert.equal(d.getMonth(), 6);
    assert.equal(d.getDate(), 17);
  });

  it("returns Invalid Date for bad input", () => {
    assert.equal(Number.isNaN(parseLocalDate("nope").getTime()), true);
  });
});

describe("rentalDays", () => {
  it("same day = 1", () => {
    const d = parseLocalDate("2026-07-17");
    assert.equal(rentalDays(d, d), 1);
  });

  it("adjacent days = 1", () => {
    assert.equal(
      rentalDays(parseLocalDate("2026-07-17"), parseLocalDate("2026-07-18")),
      1,
    );
  });

  it("three calendar spans = 2", () => {
    assert.equal(
      rentalDays(parseLocalDate("2026-07-17"), parseLocalDate("2026-07-19")),
      2,
    );
  });
});

describe("calculateRental", () => {
  it("1 day: rental 500, deposit 5500, due 6000", () => {
    const r = calculateRental(
      parseLocalDate("2026-07-17"),
      parseLocalDate("2026-07-18"),
      500,
      6000,
    );
    assert.equal(r.days, 1);
    assert.equal(r.totalRentalPrice, 500);
    assert.equal(r.refundableDeposit, 5500);
    assert.equal(r.totalDueAtPickup, 6000);
  });

  it("deposit floors at 0 when rental exceeds market", () => {
    const r = calculateRental(
      parseLocalDate("2026-07-01"),
      parseLocalDate("2026-07-20"),
      500,
      6000,
    );
    assert.equal(r.days, 19);
    assert.equal(r.totalRentalPrice, 9500);
    assert.equal(r.refundableDeposit, 0);
    assert.equal(r.totalDueAtPickup, 6000);
  });
});

describe("formatDaysLabel", () => {
  it("uses сутки / суток", () => {
    assert.equal(formatDaysLabel(1), "1 сутки");
    assert.equal(formatDaysLabel(2), "2 суток");
    assert.equal(formatDaysLabel(5), "5 суток");
    assert.equal(formatDaysLabel(21), "21 сутки");
  });
});

describe("formatRub", () => {
  it("formats with ru-RU grouping", () => {
    assert.equal(formatRub(6000), "6\u00a0000");
    assert.equal(formatRub(500), "500");
  });
});

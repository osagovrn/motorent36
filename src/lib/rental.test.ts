import { describe, expect, it } from "node:test";
import assert from "node:assert/strict";
import { calculateRental } from "../src/lib/rental";

describe("calculateRental", () => {
  it("минимум 1 сутки при одинаковых датах", () => {
    const d = new Date("2026-07-15T10:00:00");
    const r = calculateRental(d, d, 500, 6000);
    assert.equal(r.days, 1);
    assert.equal(r.totalRentalPrice, 500);
    assert.equal(r.refundableDeposit, 5500);
    assert.equal(r.totalDueAtPickup, 6000);
  });

  it("округляет вверх частичные сутки", () => {
    const start = new Date("2026-07-15T10:00:00");
    const end = new Date("2026-07-16T10:01:00");
    const r = calculateRental(start, end, 500, 6000);
    assert.equal(r.days, 2);
    assert.equal(r.totalRentalPrice, 1000);
    assert.equal(r.refundableDeposit, 5000);
  });
});

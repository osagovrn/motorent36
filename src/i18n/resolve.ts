import type { Dict } from "@/i18n/types";

/**
 * Плоский объект только со строками — то, что реально нужно
 * ContactPanel (client-компонент). Строится на сервере из Dict
 * (где часть полей — функции) вызовом всех функций с уже известными
 * статическими значениями. Функции нельзя передавать пропом через
 * границу server → client, поэтому здесь всё превращается в string.
 */
export type ContactPanelLabels = {
  telegramWrite: string;
  atPickup: string;
  atPickupNote: string;
  bookingLine: string;
  bookTitle: string;
  noOnlineForm: string;
  sizeLabel: string;
  inStock: string;
  quickTerm: string;
  day1: string;
  weekend: string;
  days3: string;
  startLabel: string;
  endLabel: string;
  rentalCost: string;
  deposit: string;
  totalAtPickup: string;
  minTermNote: string;
  callBtn: string;
  telegramBtn: string;
  maxBtn: string;
  terms: string;
  offer: string;
  privacy: string;
};

export function resolveContactPanelLabels(
  dict: Dict,
  params: {
    marketValue: string;
    availableSizesText: string;
    contactName: string;
    phoneDisplay: string;
    maxDisplay: string;
  },
): ContactPanelLabels {
  const p = dict.product;
  return {
    telegramWrite: dict.nav.telegramWrite,
    atPickup: p.atPickup(params.marketValue),
    atPickupNote: p.atPickupNote,
    bookingLine: p.bookingLine,
    bookTitle: p.bookTitle,
    noOnlineForm: p.noOnlineForm,
    sizeLabel: p.sizeLabel,
    inStock: p.inStock(params.availableSizesText),
    quickTerm: p.quickTerm,
    day1: p.day1,
    weekend: p.weekend,
    days3: p.days3,
    startLabel: p.startLabel,
    endLabel: p.endLabel,
    rentalCost: p.rentalCost,
    deposit: p.deposit,
    totalAtPickup: p.totalAtPickup,
    minTermNote: p.minTermNote(params.contactName),
    callBtn: p.callBtn(params.phoneDisplay),
    telegramBtn: p.telegramBtn,
    maxBtn: p.maxBtn(params.maxDisplay),
    terms: p.terms,
    offer: p.offer,
    privacy: p.privacy,
  };
}

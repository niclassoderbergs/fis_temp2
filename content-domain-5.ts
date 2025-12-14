
import { InfoObject } from './types';

// --- BRS-FLEX-500: Registrera Baselinemetod (Admin) ---
export const content500Input: InfoObject = {
  title: "Från Admin/Tillsynsmyndighet",
  attributes: [
    { attribute: "Metodnamn", description: "Officiellt namn på beräkningsmetoden (t.ex. 'X of Y').", article: "-" },
    { attribute: "Beskrivning", description: "Teknisk beskrivning av algoritmen.", article: "-" },
    { attribute: "Metodtyp", description: "Kategori (t.ex. 'Historical', 'Nominated').", article: "-" },
    { attribute: "Parametrar", description: "Definition av vilka parametrar som krävs (t.ex. lookback window).", article: "-" }
  ]
};

export const content500Output: InfoObject = {
  title: "Till Systemet",
  attributes: [
    { attribute: "Metod-ID", description: "Unikt ID för metoden i FIS.", article: "-" }
  ]
};

// --- BRS-FLEX-501: Välj Baselinemetod för CU ---
export const content501Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "CU-ID", description: "Resursen konfigurationen gäller.", article: "-" },
    { attribute: "Metod-ID", description: "Vald metod från godkänd lista.", article: "-" },
    { attribute: "Giltig från", description: "Startdatum för konfigurationen.", article: "-" },
    { attribute: "Specifika Parametrar", description: "Värden för metodens parametrar (om tillämpligt).", article: "-" }
  ]
};

export const content501Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Konfigurations-ID", description: "Referens till inställningen.", article: "-" },
    { attribute: "Status", description: "Sätts till 'Active'.", article: "-" }
  ]
};

// --- BRS-FLEX-502: Registrera Beräknad Baseline ---
export const content502Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "CU-ID / Budobjekt-ID", description: "Referens till resurs eller avrop.", article: "-" },
    { attribute: "Tidsperiod", description: "Start och slut för dataserien.", article: "-" },
    { attribute: "Tidsserie", description: "Värden för kontrafaktisk förbrukning/produktion per tidssteg.", article: "-" }
  ]
};

export const content502Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på mottagen data.", article: "-" },
    { attribute: "Valideringsresultat", description: "OK eller felkoder (t.ex. formatfel).", article: "-" }
  ]
};

// --- BRS-FLEX-503: Registrera Mätvärden (Sub-metering) ---
export const content503Input: InfoObject = {
  title: "Från SP",
  attributes: [
    { attribute: "CU-ID", description: "Resursen mätningen avser.", article: "-" },
    { attribute: "Registreringstidpunkt", description: "Tidpunkt då meddelandet skapades/skickades.", article: "-" },
    { attribute: "Mätar-ID", description: "Unikt ID för undermätaren (om annat än huvudmätare).", article: "-" },
    { attribute: "Tidsserie", description: "Lista av mätvärden där varje post innehåller Tidsstämpel och Värde (kW/MW).", article: "-" },
    { attribute: "Kvalitet", description: "Flagga för datakvalitet (Measured/Estimated).", article: "-" }
  ]
};

export const content503Output: InfoObject = {
  title: "Till SP",
  attributes: [
    { attribute: "Transaktions-ID", description: "Kvittens på lagring.", article: "-" }
  ]
};

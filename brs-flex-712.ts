
import { BRSData } from './types';
import { content712Input, content712Output } from './content-definitions';

export const brsFlex712: BRSData = {
  id: "BRS-FLEX-712",
  title: "DSO registrerar aktiverat energibud",
  purpose: "Marknadsplatsen för lokala flexibilitetsmarknader (DSO) skickar in information om aktiverade lokala energibud till FIS. Detta bekräftar att en resurs har avropats för att lösa ett lokalt behov.",
  actors: [
    { role: "Initiator", description: "DSO (Lokal flexibilitetsmarknad)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-712: DSO registrerar aktiverat energibud
    participant DSO as DSO (Lokal Flexmarknad)
    participant FIS as Flexibilitetsregistret

    DSO->>FIS: RegisterActivatedLocalBid (Bud-ID, Budobjekt, Aktiverad Volym)
    FIS-->>DSO: Ack (Mottaget)`,
  process: [
    { id: "BRSFLEX712-1", description: "DSO skickar information om en lokal aktivering till FIS." },
    { id: "BRSFLEX712-2", description: "FIS registrerar aktiveringen kopplat till resursen." },
    { id: "BRSFLEX712-3", description: "FIS skickar mottagningskvittens till DSO." }
  ],
  preConditions: [
    { id: "BRSFLEX712-PRE-1", description: "Ett lokalt energibud har aktiverats." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX712-POST-1", description: "Aktiverat energibud är sparat i registret." }
    ],
    rejected: [
      { id: "BRSFLEX712-POST-3", description: "Aktivering ej sparad." }
    ]
  },
  infoObjects: [content712Input, content712Output]
};

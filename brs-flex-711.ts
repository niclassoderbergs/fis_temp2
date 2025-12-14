
import { BRSData } from './types';
import { content711Input, content711Output } from './content-definitions';

export const brsFlex711: BRSData = {
  id: "BRS-FLEX-711",
  title: "TSO registrerar aktiverat energibud",
  purpose: "Marknadsplatsen för Balansmarknaden (TSO) skickar in information om aktiverade energibud (avrop) till FIS. Detta sker efter att marknaden har clearats eller ett manuellt avrop gjorts, för att registrera att en leverans förväntas.",
  actors: [
    { role: "Initiator", description: "TSO (Balansmarknad)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-711: TSO registrerar aktiverat energibud
    participant TSO as TSO (Balansmarknad)
    participant FIS as Flexibilitetsregistret

    TSO->>FIS: RegisterActivatedEnergyBid (Bud-ID, Budobjekt, Aktiverad Volym)
    FIS-->>TSO: Ack (Mottaget)`,
  process: [
    { id: "BRSFLEX711-1", description: "TSO skickar information om ett aktiverat energibud till FIS." },
    { id: "BRSFLEX711-2", description: "FIS registrerar att resursen är aktiverad för den givna perioden." },
    { id: "BRSFLEX711-3", description: "FIS skickar mottagningskvittens till TSO." }
  ],
  preConditions: [
    { id: "BRSFLEX711-PRE-1", description: "Ett energibud har aktiverats på balansmarknaden." }
  ],
  businessRules: [
    { id: "BRSFLEX711-BR-1", description: "Budobjekt-ID måste existera.", errorCode: "E_711_UNKNOWN_OBJECT" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX711-POST-1", description: "Aktiverat energibud är sparat i registret." }
    ],
    rejected: [
      { id: "BRSFLEX711-POST-3", description: "Felaktigt format, aktivering ej sparad." }
    ]
  },
  infoObjects: [content711Input, content711Output]
};

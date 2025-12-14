
import { BRSData } from './types';
import { content701Input, content701Output } from './content-definitions';

export const brsFlex701: BRSData = {
  id: "BRS-FLEX-701",
  title: "TSO registrerar kapacitetsbud",
  purpose: "Marknadsplatsen för Balansmarknaden (TSO) skickar in inkomna kapacitetsbud (för upphandling av reserver) till FIS för registrering.",
  actors: [
    { role: "Initiator", description: "TSO (Balansmarknad)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-701: TSO registrerar kapacitetsbud
    participant TSO as TSO (Balansmarknad)
    participant FIS as Flexibilitetsregistret

    TSO->>FIS: RegisterCapacityBid (Bud-ID, Budobjekt, Volym MW)
    FIS-->>TSO: Ack (Mottaget)`,
  process: [
    { id: "BRSFLEX701-1", description: "TSO skickar budinformationen (kapacitet) till FIS." },
    { id: "BRSFLEX701-2", description: "FIS skickar mottagningskvittens till TSO." }
  ],
  preConditions: [
    { id: "BRSFLEX701-PRE-1", description: "TSO har ett kapacitetsbud att registrera." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX701-POST-1", description: "Budet är mottaget och sparat." }
    ],
    rejected: [
      { id: "BRSFLEX701-POST-2", description: "Tekniskt fel vid mottagande." }
    ]
  },
  infoObjects: [content701Input, content701Output]
};

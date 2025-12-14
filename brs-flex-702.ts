
import { BRSData } from './types';
import { content702Input, content702Output } from './content-definitions';

export const brsFlex702: BRSData = {
  id: "BRS-FLEX-702",
  title: "DSO registrerar kapacitetsbud",
  purpose: "Marknadsplatsen för lokala flexibilitetsmarknader (DSO eller ombud) skickar in kapacitetsbud för lokal flexibilitet till FIS.",
  actors: [
    { role: "Initiator", description: "DSO (Lokal flexibilitetsmarknad)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-702: DSO registrerar kapacitetsbud
    participant DSO as DSO (Lokal Flexmarknad)
    participant FIS as Flexibilitetsregistret

    DSO->>FIS: RegisterLocalCapacityBid (Bud-ID, Budobjekt, Volym MW)
    FIS-->>DSO: Ack (Mottaget)`,
  process: [
    { id: "BRSFLEX702-1", description: "DSO (eller marknadsplatsen) skickar budinformation (kapacitet) till FIS." },
    { id: "BRSFLEX702-2", description: "FIS skickar mottagningskvittens till DSO." }
  ],
  preConditions: [
    { id: "BRSFLEX702-PRE-1", description: "DSO har ett lokalt kapacitetsbud att registrera." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX702-POST-1", description: "Budet är sparat i registret." }
    ],
    rejected: [
      { id: "BRSFLEX702-POST-3", description: "Bud ej sparat." }
    ]
  },
  infoObjects: [content702Input, content702Output]
};

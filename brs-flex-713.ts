
import { BRSData } from './types';
import { content713Input, content713Output } from './content-definitions';

export const brsFlex713: BRSData = {
  id: "BRS-FLEX-713",
  title: "Nemo registrerar DA/ID handel",
  purpose: "NEMO skickar in bud från Day-Ahead eller Intraday-marknaden för registrering i FIS.",
  actors: [
    { role: "Initiator", description: "NEMO" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-713: Nemo registrerar DA/ID handel
    participant NEMO as NEMO
    participant FIS as Flexibilitetsregistret

    NEMO->>FIS: RegisterWholesaleBid (Bud-ID, Marknad, Volym)
    FIS-->>NEMO: Ack`,
  process: [
    { id: "BRSFLEX713-1", description: "NEMO skickar buddata till FIS." },
    { id: "BRSFLEX713-2", description: "FIS skickar mottagningskvittens till NEMO." }
  ],
  preConditions: [
    { id: "BRSFLEX713-PRE-1", description: "NEMO har bud att registrera." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX713-POST-1", description: "Bud registrerat." }
    ],
    rejected: [
      { id: "BRSFLEX713-POST-2", description: "Fel vid registrering." }
    ]
  },
  infoObjects: [content713Input, content713Output]
};

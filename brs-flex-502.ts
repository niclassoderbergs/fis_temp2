
import { BRSData } from './types';
import { content502Input, content502Output } from './content-definitions';

export const brsFlex502: BRSData = {
  id: "BRS-FLEX-502",
  title: "Lista godkända baselinemetoder",
  purpose: "Möjliggör för SP att se vilka baselinemetoder som finns tillgängliga att välja för deras resurser.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-502: Lista godkända baselinemetoder
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: ListBaselineMethods (Filter)
    activate FIS
    FIS->>FIS: Hämta aktiva metoder
    FIS-->>SP: BaselineMethodList (ID, Namn)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX502-1", description: "SP begär en lista över tillgängliga baselinemetoder." },
    { id: "BRSFLEX502-2", description: "FIS returnerar ID och Namn på alla godkända metoder." }
  ],
  preConditions: [
    { id: "BRSFLEX502-PRE-1", description: "SP vill konfigurera en resurs." }
  ],
  businessRules: [],
  postConditions: {
    accepted: [
      { id: "BRSFLEX502-POST-1", description: "Lista returnerad." }
    ],
    rejected: [
      { id: "BRSFLEX502-POST-2", description: "Ingen data." }
    ]
  },
  infoObjects: [content502Input, content502Output]
};


import { BRSData } from '../../types';
import { content502Input, content502Output } from '../../content-definitions';

export const brsFlex502: BRSData = {
  id: "BRS-FLEX-502",
  title: "Lista godkända baselinemetoder",
  purpose: "Möjliggör för SP att se vilka baselinemetoder som finns tillgängliga att välja för deras resurser.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-502: Lista godkända baselinemetoder
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: ListBaselineMethods (Filter)
    activate FIS
    FIS->>FIS: Hämta aktiva metoder
    FIS-->>SP: BaselineMethodList (ID, Namn)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX502-1", description: "En SP har begärt en lista över tillgängliga baselinemetoder." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX502-2", description: "FIS har returnerat listan över godkända metoder." }
    ],
    rejected: [
      { id: "BRSFLEX502-3", description: "Ingen data." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX502-4", description: "SP begär en lista över tillgängliga baselinemetoder." },
    { id: "BRSFLEX502-5", description: "FIS skickar listan till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX502-6", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content502Input, content502Output]
};

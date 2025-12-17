
import { BRSData } from '../../types';
import { content804Input, content804Output } from '../../content-definitions';

export const brsFlex804: BRSData = {
  id: "BRS-FLEX-804",
  title: "SP avregistrerar sig",
  purpose: "Hanterar processen när en SP på eget initiativ vill lämna marknaden och avsluta sitt konto.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-804: SP avregistrerar sig
    participant SP as SP
    participant FIS as FIS

    SP->>FIS: RequestDeregistration (Önskat datum)
    activate FIS
    FIS->>FIS: Kontrollera aktiva åtaganden (Avtal, Bud)
    
    alt Inga hinder
        FIS->>FIS: Schemalägg avslut
        FIS-->>SP: Ack (Avslutsdatum bekräftat)
    else Aktiva åtaganden
        FIS-->>SP: Error (Måste avsluta avtal först)
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX804-1", description: "SP har begärt utträde." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX804-2", description: "FIS har schemalagt avslut av SP-kontot." }
    ],
    rejected: [
      { id: "BRSFLEX804-3", description: "Avregistrering nekad pga aktiva beroenden." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX804-4", description: "SP får inte ha aktiva Flexavtal som sträcker sig förbi avslutsdatum.", errorCode: "E_804_ACTIVE_CONTRACTS" },
    { id: "BRSFLEX804-5", description: "SP får inte ha aktiva bud på marknaden.", errorCode: "E_804_ACTIVE_BIDS" }
  ],
  process: [
    { id: "BRSFLEX804-6", description: "SP begär avregistrering." },
    { id: "BRSFLEX804-7", description: "FIS kontrollerar villkor och bekräftar avslut." }
  ],
  infoObjects: [content804Input, content804Output]
};


import { BRSData } from '../../types';
import { content810Input, content810Output } from '../../content-definitions';

export const brsFlex810: BRSData = {
  id: "BRS-FLEX-810",
  title: "FIS stänger tillfälligt av SP",
  purpose: "Möjliggör för systemadministratör att pausa en SP:s rättigheter (t.ex. vid misstänkt fusk eller tekniska problem). SP kan inte lägga nya bud men existerande åtaganden kan hanteras.",
  actors: [
    { role: "Initiator", description: "FIS Admin" },
    { role: "Mottagare", description: "System (Internal)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-810: FIS stänger tillfälligt av SP
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: SuspendActor (SP-ID, Orsak)
    activate FIS
    FIS->>FIS: Sätt status 'Suspended'
    FIS->>FIS: Spärra inloggning/API
    FIS-->>Admin: Ack (Status Updated)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX810-1", description: "Administrativt beslut om avstängning har fattats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX810-2", description: "SP-status är satt till 'Suspended'." }
    ],
    rejected: [
      { id: "BRSFLEX810-4", description: "Åtgärden misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX810-5", description: "Admin stänger av SP i systemet." },
    { id: "BRSFLEX810-6", description: "Systemet verkställer spärrar." }
  ],
  infoObjects: [content810Input, content810Output]
};

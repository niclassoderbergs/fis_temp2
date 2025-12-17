
import { BRSData } from '../../types';
import { content810Input, content810Output } from '../../content-definitions';

export const brsFlex810: BRSData = {
  id: "BRS-FLEX-810",
  title: "Tillfällig avstängning av SP",
  purpose: "Möjliggör för systemadministratör att pausa en SP:s rättigheter (t.ex. vid misstänkt fusk eller tekniska problem). SP kan inte lägga nya bud men existerande åtaganden kan hanteras.",
  actors: [
    { role: "Initiator", description: "FIS Admin" },
    { role: "Mottagare", description: "SP" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-810: Tillfällig avstängning
    participant Admin as FIS Admin
    participant FIS as FIS
    participant SP as SP

    Admin->>FIS: SuspendActor (SP-ID, Orsak)
    activate FIS
    FIS->>FIS: Sätt status 'Suspended'
    FIS->>FIS: Spärra inloggning/API
    FIS->>SP: NotifySuspension (Orsak)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX810-1", description: "Administrativt beslut om avstängning har fattats." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX810-2", description: "SP-status är satt till 'Suspended'." },
      { id: "BRSFLEX810-3", description: "SP har notifierats." }
    ],
    rejected: [
      { id: "BRSFLEX810-4", description: "Åtgärden misslyckades." }
    ]
  },
  businessRules: [],
  process: [
    { id: "BRSFLEX810-5", description: "Admin stänger av SP i systemet." },
    { id: "BRSFLEX810-6", description: "Systemet verkställer spärrar och notifierar SP." }
  ],
  infoObjects: [content810Input, content810Output]
};

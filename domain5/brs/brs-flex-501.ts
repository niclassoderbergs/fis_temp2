
import { BRSData } from '../../types';
import { content501Input, content501Output } from '../../content-definitions';

export const brsFlex501: BRSData = {
  id: "BRS-FLEX-501",
  title: "TSO registrerar godkänd baselinemetod",
  purpose: "Att lägga in de beräkningsmetoder för baseline som är godkända av tillsynsmyndigheten (Ei) i systemet (katalogdata). SP kan sedan välja från dessa vid konfiguration av sina resurser.",
  actors: [
    { role: "Initiator", description: "System Admin (FIS) på uppdrag av TSO/DSO" },
    { role: "Mottagare", description: "Service Provider (SP) - som konsument av listan" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-501: Registrera Baselinemetod
    participant Admin as FIS Admin
    participant FIS as FIS

    Admin->>FIS: RegisterBaselineMethod (Namn, Logik, Parametrar)
    activate FIS
    FIS->>FIS: Validera struktur
    FIS->>FIS: Spara i metodkatalog
    FIS-->>Admin: OK (Metod-ID)
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX501-1", description: "En administratör har registrerat en godkänd baselinemetod i systemet." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX501-2", description: "FIS har registrerat den nya baselinemetoden." },
      { id: "BRSFLEX501-3", description: "Administratör har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX501-4", description: "Ingen metod sparad." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX501-5", description: "Endast administratörer får redigera metodkatalogen.", errorCode: "E_GEN_AUTH_FAILED" },
    { id: "BRSFLEX501-6", description: "Metodnamn måste vara unikt.", errorCode: "E_501_DUPLICATE_NAME" }
  ],
  process: [
    { id: "BRSFLEX501-7", description: "En administratör registrerar en ny godkänd baselinemetod i systemet." },
    { id: "BRSFLEX501-8", description: "FIS bekräftar registreringen till administratören." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX501-9", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content501Input, content501Output]
};

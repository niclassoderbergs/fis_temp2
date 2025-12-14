
import { BRSData } from './types';
import { content501Input, content501Output } from './content-definitions';

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
    participant FIS as Flexibilitetsregistret

    Admin->>FIS: RegisterBaselineMethod (Namn, Logik, Parametrar)
    activate FIS
    FIS->>FIS: Validera struktur
    FIS->>FIS: Spara i metodkatalog
    FIS-->>Admin: OK (Metod-ID)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX501-1", description: "Administratör registrerar en ny godkänd baselinemetod i systemet." },
    { id: "BRSFLEX501-2", description: "Metoden görs tillgänglig för val i BRS-FLEX-511." }
  ],
  preConditions: [
    { id: "BRSFLEX501-PRE-1", description: "Metoden har godkänts regulatoriskt (av Ei) eller överenskommits i branschregelverk." }
  ],
  businessRules: [
    { id: "BRSFLEX501-BR-1", description: "Endast administratörer får redigera metodkatalogen.", errorCode: "E_GEN_AUTH_FAILED" },
    { id: "BRSFLEX501-BR-2", description: "Metodnamn måste vara unikt.", errorCode: "E_501_DUPLICATE_NAME" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX501-POST-1", description: "Ny metod finns tillgänglig i systemet." }
    ],
    rejected: [
      { id: "BRSFLEX501-POST-2", description: "Ingen metod sparad." }
    ]
  },
  infoObjects: [content501Input, content501Output]
};


import { BRSData } from './types';
import { content500Input, content500Output } from './content-definitions';

export const brsFlex500: BRSData = {
  id: "BRS-FLEX-500",
  title: "Registrera Godkänd Baselinemetod",
  purpose: "Att lägga in de beräkningsmetoder för baseline som är godkända av tillsynsmyndigheten (Ei) i systemet (katalogdata). SP kan sedan välja från dessa vid konfiguration av sina resurser.",
  actors: [
    { role: "Initiator", description: "System Admin (FIS) på uppdrag av TSO/DSO" },
    { role: "Mottagare", description: "Service Provider (SP) - som konsument av listan" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-500: Registrera Baselinemetod
    participant Admin as FIS Admin
    participant FIS as Flexibilitetsregistret

    Admin->>FIS: RegisterBaselineMethod (Namn, Logik, Parametrar)
    activate FIS
    FIS->>FIS: Validera struktur
    FIS->>FIS: Spara i metodkatalog
    FIS-->>Admin: OK (Metod-ID)
    deactivate FIS`,
  process: [
    "Administratör registrerar en ny godkänd baselinemetod i systemet.",
    "Metoden görs tillgänglig för val i BRS-FLEX-501."
  ],
  preConditions: [
    "Metoden har godkänts regulatoriskt (av Ei) eller överenskommits i branschregelverk."
  ],
  businessRules: [
    { id: "Regel 1", description: "Endast administratörer får redigera metodkatalogen.", errorCode: "E_GEN_AUTH_FAILED" },
    { id: "Regel 2", description: "Metodnamn måste vara unikt.", errorCode: "E_500_DUPLICATE_NAME" }
  ],
  postConditions: {
    accepted: [
      { id: "BRS-FLEX-500-POST-1", description: "Ny metod finns tillgänglig i systemet." }
    ],
    rejected: [
      { id: "BRS-FLEX-500-POST-2", description: "Ingen metod sparad." }
    ]
  },
  infoObjects: [content500Input, content500Output]
};


import { BRSData } from './types';
import { content140Input, content140Output } from './content-definitions';

export const brsFlex140: BRSData = {
  id: "BRS-FLEX-140",
  title: "SP kopplar CU till SPG",
  purpose: "Att inkludera en CU i en marknadsportfölj (SPG). Om CU redan ligger i en annan SPG flyttas den.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-140: SP kopplar CU till SPG
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: LinkCUtoSPG (SPG-ID, CU-ID, Startdatum)
    activate FIS
    FIS->>FIS: Validera affärsregler
    
    alt Validering OK
        alt Redan kopplad till annan SPG
            FIS->>FIS: Trigger BRS-FLEX-1420 (Ta bort från gammal SPG)
        end

        FIS->>FIS: Skapa Relation
        FIS->>FIS: Uppdatera SPG status (Available -> Active)
        FIS-->>SP: Ack (SPG-ID, CU-ID, Startdatum)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX140-12", description: "SP kopplar en CU till en SPG och anger startdatum." },
    { id: "BRSFLEX140-13", description: "FIS validerar att elområden matchar och att CU är förkvalificerad." },
    { id: "BRSFLEX140-14", description: "Om CU tillhör en annan SPG triggas BRS-FLEX-1420 (flytt)." },
    { id: "BRSFLEX140-15", description: "Relationen skapas." },
    { id: "BRSFLEX140-16", description: "Om SPG hade status 'Available' ändras den till 'Active'." },
    { id: "BRSFLEX140-17", description: "FIS returnerar kvittens med SPG-ID, CU-ID och startdatum." }
  ],
  preConditions: [
    { id: "BRSFLEX140-1", description: "SP vill koppla en CU till en SPG." }
  ],
  businessRules: [
    { id: "BRSFLEX140-6", description: "Angivet SPG-ID måste existera i FIS.", errorCode: "E_140_SPG_NOT_FOUND" },
    { id: "BRSFLEX140-7", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_140_CU_NOT_FOUND" },
    { id: "BRSFLEX140-8", description: "CU måste ha status Active.", errorCode: "E_140_INVALID_CU_STATUS" },
    { id: "BRSFLEX140-9", description: "SPG måste ha status Active eller Available.", errorCode: "E_140_INVALID_SPG_STATUS" },
    { id: "BRSFLEX140-10", description: "CU måste ha en godkänd produktförkvalificering.", errorCode: "E_140_NOT_PREQUALIFIED" },
    { id: "BRSFLEX140-11", description: "CU och SPG måste ligga i samma elområde.", errorCode: "E_140_ZONE_MISMATCH" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX140-2", description: "CU har länkats till SPG." },
      { id: "BRSFLEX140-3", description: "Eventuell tidigare koppling till annan SPG har tagits bort (genom exekvering av BRS-FLEX-1420)." },
      { id: "BRSFLEX140-4", description: "SPG-status har uppdaterats till 'Active'." }
    ],
    rejected: [
      { id: "BRSFLEX140-5", description: "Ingen länk har skapats." }
    ]
  },
  infoObjects: [content140Input, content140Output]
};


import { BRSData } from './types';
import { content130Input, content130Output } from './content-definitions';

export const brsFlex130: BRSData = {
  id: "BRS-FLEX-130",
  title: "SP kopplar CU till SPU",
  purpose: "Att lägga till en eller flera existerande CU:s i en SPU. Om en CU redan ligger i en annan SPU flyttas den till den nya (den gamla kopplingen tas bort).",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-130: SP kopplar CU till SPU
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: LinkCUtoSPU (SPU-ID, [CU-ID], Startdatum)
    activate FIS
    FIS->>FIS: Validera affärsregler
    
    alt Validering OK
        loop För varje CU
            alt Redan kopplad till annan SPU
                FIS->>FIS: Trigger BRS-FLEX-1320 (Ta bort från gammal SPU)
            end
            FIS->>FIS: Skapa ny Relation
        end

        FIS->>FIS: Uppdatera SPU status (Available -> Active)
        FIS->>FIS: Uppdatera SPU kapacitet
        FIS-->>SP: LinkAcknowledgement (SPU-ID, CU-ID, Startdatum)
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX130-13", description: "SP skickar begäran om att länka en eller flera CU till en SPU." },
    { id: "BRSFLEX130-14", description: "FIS validerar att SP äger samtliga objekt och att de uppfyller statuskrav." },
    { id: "BRSFLEX130-15", description: "FIS kontrollerar att CU har minst en godkänd produktförkvalificering." },
    { id: "BRSFLEX130-16", description: "Om en CU redan tillhör en annan SPU, triggas BRS-FLEX-1320 för att ta bort den gamla kopplingen (flytt)." },
    { id: "BRSFLEX130-17", description: "FIS skapar den nya länken och uppdaterar aggregerad data för SPU:n." },
    { id: "BRSFLEX130-18", description: "Om SPU hade status 'Available' ändras den till 'Active'." },
    { id: "BRSFLEX130-19", description: "FIS returnerar kvittens med SPU-ID, CU-ID och startdatum för kopplingen." }
  ],
  preConditions: [
    { id: "BRSFLEX130-1", description: "SP vill koppla en CU till en SPU." }
  ],
  businessRules: [
    { id: "BRSFLEX130-6", description: "Angivet SPU-ID måste existera i FIS.", errorCode: "E_130_SPU_NOT_FOUND" },
    { id: "BRSFLEX130-7", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_130_CU_NOT_FOUND" },
    { id: "BRSFLEX130-8", description: "CU måste ha status Active.", errorCode: "E_130_INVALID_CU_STATUS" },
    { id: "BRSFLEX130-9", description: "SPU måste ha status Active eller Available.", errorCode: "E_130_INVALID_SPU_STATUS" },
    { id: "BRSFLEX130-10", description: "CU måste ha en godkänd produktförkvalificering.", errorCode: "E_130_NOT_PREQUALIFIED" },
    { id: "BRSFLEX130-11", description: "Både CU och SPU måste tillhöra samma SP (Ägarskap).", errorCode: "E_130_OWNER_MISMATCH" },
    { id: "BRSFLEX130-12", description: "CU och SPU måste ligga i samma elområde.", errorCode: "E_130_ZONE_MISMATCH" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX130-2", description: "Relation mellan CU och SPU har skapats." },
      { id: "BRSFLEX130-3", description: "Eventuell tidigare koppling till annan SPU har tagits bort (genom exekvering av BRS-FLEX-1320)." },
      { id: "BRSFLEX130-4", description: "SPU:ns aggregerade kapacitet har uppdaterats och status satts till 'Active'." }
    ],
    rejected: [
      { id: "BRSFLEX130-5", description: "Ingen koppling har skapats." }
    ]
  },
  infoObjects: [content130Input, content130Output]
};


import { BRSData } from '../../types';
import { content130Input, content130Output } from '../../content-definitions';

export const brsFlex130: BRSData = {
  id: "BRS-FLEX-130",
  title: "SP kopplar CU till SPU",
  purpose: "Att lägga till en eller flera existerande CU:s i en SPU. Om en CU redan ligger i en annan SPU flyttas den till den nya (den gamla kopplingen tas bort).",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-130: SP kopplar CU till SPU
    participant SP as SP
    participant FIS as FIS

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
  preConditions: [
    { id: "BRSFLEX130-1", description: "En SP har kopplat en styrbar enhet till en SPU." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX130-2", description: "FIS har upprättat kopplingen mellan den styrbara enheten och SPU:n." },
      { id: "BRSFLEX130-3", description: "FIS har uppdaterat SPU:ns status till aktiv." }
    ],
    rejected: [
      { id: "BRSFLEX130-4", description: "Ingen koppling har skapats." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX130-5", description: "Angivet SPU-ID måste existera i FIS.", errorCode: "E_130_SPU_NOT_FOUND" },
    { id: "BRSFLEX130-6", description: "Angivet CU-ID måste existera i FIS.", errorCode: "E_130_CU_NOT_FOUND" },
    { id: "BRSFLEX130-7", description: "CU måste ha status Active.", errorCode: "E_130_INVALID_CU_STATUS" },
    { id: "BRSFLEX130-8", description: "SPU måste ha status Active eller Available.", errorCode: "E_130_INVALID_SPU_STATUS" },
    { id: "BRSFLEX130-9", description: "CU måste ha en godkänd produktförkvalificering.", errorCode: "E_130_NOT_PREQUALIFIED" },
    { id: "BRSFLEX130-10", description: "Både CU och SPU måste tillhöra samma SP (Ägarskap).", errorCode: "E_130_OWNER_MISMATCH" },
    { id: "BRSFLEX130-11", description: "CU och SPU måste ligga i samma elområde.", errorCode: "E_130_ZONE_MISMATCH" }
  ],
  process: [
    { id: "BRSFLEX130-12", description: "SP begär koppling av en CU till en SPU." },
    { id: "BRSFLEX130-13", description: "FIS bekräftar kopplingen till SP." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX130-14", description: "FIS returnerar ett felmeddelande enligt affärsregel.", implemented: "Yes" }
  ],
  infoObjects: [content130Input, content130Output]
};

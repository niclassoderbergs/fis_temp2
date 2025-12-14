
import { BRSData } from './types';
import { content311Input, content311Output } from './content-definitions';

export const brsFlex311: BRSData = {
  id: "BRS-FLEX-311",
  title: "SP begär Produktförkvalificering",
  purpose: "Process för att ansöka om att en SPU/SPG ska få leverera en viss produkt (t.ex. FCR-N, mFRR). Detta initierar testfasen.",
  actors: [
    { role: "Initiator", description: "SP" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" },
    { role: "Sekundär", description: "Systemoperatör (TSO) - via notifiering" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-311: SP begär Produktförkvalificering
    participant SP as SP
    participant FIS as Flexibilitetsregistret
    participant TSO as Systemoperatör

    SP->>FIS: RequestProductQualification (SPU-ID, Produkt, [CU-Data])
    activate FIS
    FIS->>FIS: Validera affärsregler
    
    alt Validering OK
        FIS->>FIS: Sätt status: 'Pending Test'
        FIS->>TSO: Notify (New Application)
        FIS-->>SP: Ack
    else Validering Fel
        FIS-->>SP: Error (Validation Failed)
    end
    deactivate FIS`,
  process: [
    { id: "BRSFLEX311-10", description: "SP skickar ansökan om att kvalificera en SPU eller SPG för en specifik marknadsprodukt. Ansökan inkluderar Maximal budbar effekt samt detaljerad information per ingående CU (Maximal effekt och Indikativt bidrag)." },
    { id: "BRSFLEX311-11", description: "FIS validerar att resursen är aktiv." },
    { id: "BRSFLEX311-12", description: "FIS sätter kvalificeringsstatus till 'Pending Test'." },
    { id: "BRSFLEX311-13", description: "FIS notifierar relevant Systemoperatör (TSO) om att en ansökan inkommit." }
  ],
  preConditions: [
    { id: "BRSFLEX311-1", description: "SP vill ansöka om produktförkvalificering." }
  ],
  businessRules: [
    { id: "BRSFLEX311-6", description: "Angivet SPU-ID eller SPG-ID måste existera i FIS.", errorCode: "E_311_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX311-7", description: "SPU/SPG måste vara registrerad och aktiv.", errorCode: "E_311_RESOURCE_NOT_ACTIVE" },
    { id: "BRSFLEX311-8", description: "En resurs kan ha flera pågående kvalificeringar för olika produkter samtidigt.", errorCode: "-" },
    { id: "BRSFLEX311-9", description: "Alla CU-IDn som inkluderas i den strukturella datan måste vara kopplade till SPU/SPG.", errorCode: "E_311_CU_NOT_LINKED" },
    { id: "BRSFLEX311-10", description: "Summan av indikativa bidrag per CU får inte avvika orimligt mycket från SPU/SPG totala budbara effekt.", errorCode: "E_311_CAPACITY_MISMATCH" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX311-2", description: "Status har satts till 'Pending Test'." },
      { id: "BRSFLEX311-3", description: "TSO har blivit notifierad." },
      { id: "BRSFLEX311-4", description: "SP har mottagit en bekräftelse på att ansökan är mottagen." }
    ],
    rejected: [
      { id: "BRSFLEX311-5", description: "Ansökan har avvisats." }
    ]
  },
  infoObjects: [content311Input, content311Output]
};

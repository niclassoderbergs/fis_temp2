
import { BRSData } from '../../types';
import { content713Input, content713Output } from '../../content-definitions';

export const brsFlex713: BRSData = {
  id: "BRS-FLEX-713",
  title: "Nemo registrerar DA/ID handel",
  purpose: "NEMO skickar in bud från Day-Ahead eller Intraday-marknaden för registrering i FIS.",
  actors: [
    { role: "Initiator", description: "NEMO" },
    { role: "Mottagare", description: "FIS" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-713: Nemo registrerar DA/ID handel
    participant NEMO as NEMO
    participant FIS as FIS

    NEMO->>FIS: RegisterWholesaleBid (Bud-ID, Marknad, Volym)
    activate FIS
    FIS->>FIS: Validera format
    
    alt Validering OK
        FIS->>FIS: Lagra bud
        FIS-->>NEMO: Ack
    else Validering Fel
        FIS-->>NEMO: Error
    end
    deactivate FIS`,
  preConditions: [
    { id: "BRSFLEX713-1", description: "En marknadsaktör (NEMO) har registrerat grossisthandel." }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX713-2", description: "FIS har lagrat grossistbudet." },
      { id: "BRSFLEX713-3", description: "Marknadsaktören (NEMO) har mottagit kvittens på registreringen." }
    ],
    rejected: [
      { id: "BRSFLEX713-4", description: "Fel vid registrering." }
    ]
  },
  businessRules: [
    { id: "BRSFLEX713-5", description: "Angivet Budobjekt-ID måste existera i FIS och vara en giltig SPU eller SPG.", errorCode: "E_713_RESOURCE_NOT_FOUND" },
    { id: "BRSFLEX713-6", description: "Marknadstypen måste vara 'Day-Ahead' eller 'Intraday'.", errorCode: "E_713_INVALID_MARKET" },
    { id: "BRSFLEX713-7", description: "Pris måste anges och valutan måste vara EUR.", errorCode: "E_713_INVALID_PRICE_CURRENCY" },
    { id: "BRSFLEX713-8", description: "Slutdatum för handeln måste vara senare än startdatum.", errorCode: "E_GEN_INVALID_PERIOD" }
  ],
  process: [
    { id: "BRSFLEX713-9", description: "NEMO registrerar ett grossistbud." },
    { id: "BRSFLEX713-10", description: "FIS bekräftar registreringen till NEMO." }
  ],
  exceptionFlow: [
    { id: "BRSFLEX713-11", description: "FIS returnerar ett felmeddelande enligt affärsregel." }
  ],
  infoObjects: [content713Input, content713Output]
};

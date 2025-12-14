
import { BRSData } from './types';
import { content611Input, content611Output } from './content-definitions';

export const brsFlex611: BRSData = {
  id: "BRS-FLEX-611",
  title: "SP registrerar beräknad aktiverad flexibilitetsvolym för CU",
  purpose: "SP skickar in specifik mätdata kopplad till en genomförd aktivering. Syftet är att tillhandahålla underlag för verifiering av att den sålda flexibiliteten faktiskt levererades. Detta skiljer sig från löpande mätvärdesinsamling (601) då denna data är hårt knuten till ett affärshändelse-ID.",
  actors: [
    { role: "Initiator", description: "Service Provider (SP)" },
    { role: "Mottagare", description: "Flexibilitetsregistret (FIS)" }
  ],
  diagramCode: `sequenceDiagram
    title BRS-FLEX-611: Registrera leveransdata
    participant SP as SP
    participant FIS as Flexibilitetsregistret

    SP->>FIS: SubmitDeliveryData (Aktiverings-ID, CU-ID, Tidsserie)
    activate FIS
    FIS->>FIS: Validera Aktiverings-ID
    FIS->>FIS: Validera Täckning (Period)
    FIS->>FIS: Lagra Leveransbevis
    FIS-->>SP: Ack (Transaktions-ID)
    deactivate FIS`,
  process: [
    { id: "BRSFLEX611-1", description: "Efter avslutad leverans sammanställer SP mätdata för den aktuella perioden." },
    { id: "BRSFLEX611-2", description: "SP skickar data till FIS och refererar till det Aktiverings-ID/Bud-ID som datan avser." },
    { id: "BRSFLEX611-3", description: "FIS kontrollerar att refererat ID existerar och är öppet för rapportering." },
    { id: "BRSFLEX611-4", description: "FIS sparar datan som 'Leveransbevis' inför kommande verifiering (Domän 7)." }
  ],
  preConditions: [
    { id: "BRSFLEX611-PRE-1", description: "En aktivering/avrop har skett." },
    { id: "BRSFLEX611-PRE-2", description: "SP har mätvärden tillgängliga för perioden." }
  ],
  businessRules: [
    { id: "BRSFLEX611-BR-1", description: "Datan måste täcka hela aktiveringsperioden.", errorCode: "E_611_INCOMPLETE_PERIOD" },
    { id: "BRSFLEX611-BR-2", description: "Upplösningen på tidsserien måste matcha produktens krav för verifiering.", errorCode: "E_611_INVALID_RESOLUTION" },
    { id: "BRSFLEX611-BR-3", description: "Aktiverings-ID måste vara giltigt och tillhöra SP.", errorCode: "E_611_INVALID_ACTIVATION_ID" }
  ],
  postConditions: {
    accepted: [
      { id: "BRSFLEX611-POST-1", description: "Leveransdata lagrad och kopplad till affärshändelsen." }
    ],
    rejected: [
      { id: "BRSFLEX611-POST-2", description: "Data avvisad (t.ex. felaktigt format eller saknad referens)." }
    ]
  },
  infoObjects: [content611Input, content611Output]
};

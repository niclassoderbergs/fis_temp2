
import { MPSData } from '../../types';

export const mpsFlex600: MPSData = {
  id: "MPS-FLEX-600",
  title: "Hantering av Mätdata och Verifieringsunderlag",
  domain: "Domän 6: Mätvärden",
  purpose: "Att hantera insamling, validering och distribution av mätvärden som krävs för verifiering och avräkning.",
  trigger: "Leveransperiod avslutad eller behov av verifiering.",
  scenarios: [
    {
      id: "MPS-FLEX-600-Sc1",
      title: "Inrapportering av CU-mätvärden (Sub-metering)",
      description: "SP rapporterar uppmätta värden från enheten för att möjliggöra verifiering.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-600-Sc1: Inrapportering av Sub-metering
    participant SP as SP
    participant FIS as FIS
    participant SO as Marknadens Parter

    Note over SP: Händelse: Ny mätdata från resurser tillgänglig
    SP->>FIS: Rapportera mätvärden (BRS-FLEX-601)
    activate FIS
    FIS->>FIS: Lagra tidsserier
    FIS-->>SP: Bekräftat
    
    Note over FIS: Systemtrigger: Data ska distribueras
    FIS->>SO: Distribuera mätdata till berörda (BRS-FLEX-603)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-600-Sc1.1", role: "SP", action: "Rapportera Mätvärden", 
          description: "SP har registrerat mätvärden för en styrbar enhet.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-1" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1.2", role: "FIS", action: "Spara Data", 
          description: "FIS har lagrat mottagna CU-mätvärden.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-2" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1.3", role: "FIS", action: "Kvittens", 
          description: "SP har mottagit kvittens på lagringen.", 
          refBRS: "BRS-FLEX-601", refRule: "BRSFLEX601-3" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1.4", role: "System", action: "Trigger Distribution", 
          description: "Mätvärden har inkommit och ska distribueras.", 
          refBRS: "BRS-FLEX-603", refRule: "BRSFLEX603-1" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1.5", role: "TSO", action: "Ta emot Data", 
          description: "Systemoperatören har mottagit CU-mätvärden.", 
          refBRS: "BRS-FLEX-603", refRule: "BRSFLEX603-5" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1.6", role: "DSO", action: "Ta emot Data", 
          description: "Nätägaren har mottagit CU-mätvärden.", 
          refBRS: "BRS-FLEX-603", refRule: "BRSFLEX603-6" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1.7", role: "BRP", action: "Ta emot Data", 
          description: "Balansansvarig har mottagit CU-mätvärden.", 
          refBRS: "BRS-FLEX-603", refRule: "BRSFLEX603-7" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc1.8", role: "Elleverantör", action: "Ta emot Data", 
          description: "Elleverantör har mottagit CU-mätvärden.", 
          refBRS: "BRS-FLEX-603", refRule: "BRSFLEX603-8" 
        }
      ]
    },
    {
      id: "MPS-FLEX-600-Sc4",
      title: "Rapportering av Aktiverad Volym (SP)",
      description: "SP skickar in beräknad levererad volym för en specifik aktivering.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-600-Sc4: Rapportering av leveransbevis
    participant SP as SP
    participant FIS as FIS
    participant SO as Marknadens Parter

    Note over SP: Beslut: Leverans för avrop är beräknad
    SP->>FIS: Rapportera levererad volym (BRS-FLEX-611)
    activate FIS
    FIS->>FIS: Lagra bevis för verifiering
    FIS-->>SP: Bekräftat
    
    Note over FIS: Systemtrigger: Volym ska distribueras
    FIS->>SO: Notifiera om fastställd volym (BRS-FLEX-613)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-600-Sc4.1", role: "SP", action: "Rapportera Volym", 
          description: "En SP har registrerat leveransdata för en aktivering.", 
          refBRS: "BRS-FLEX-611", refRule: "BRSFLEX611-1" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc4.2", role: "FIS", action: "Spara Data", 
          description: "FIS har lagrat leveransdata kopplad till aktiveringen.", 
          refBRS: "BRS-FLEX-611", refRule: "BRSFLEX611-2" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc4.3", role: "FIS", action: "Kvittens", 
          description: "SP har mottagit kvittens på lagringen.", 
          refBRS: "BRS-FLEX-611", refRule: "BRSFLEX611-3" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc4.4", role: "System", action: "Trigger Distribution", 
          description: "Beräknad leveransvolym har registrerats av SP.", 
          refBRS: "BRS-FLEX-613", refRule: "BRSFLEX613-1" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc4.5", role: "TSO", action: "Ta emot Volym", 
          description: "Systemoperatören har mottagit flexibilitetsvolym.", 
          refBRS: "BRS-FLEX-613", refRule: "BRSFLEX613-3" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc4.6", role: "DSO", action: "Ta emot Volym", 
          description: "Nätägaren har mottagit flexibilitetsvolym.", 
          refBRS: "BRS-FLEX-613", refRule: "BRSFLEX613-4" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc4.7", role: "BRP", action: "Ta emot Volym", 
          description: "BRP har mottagit flexibilitetsvolym.", 
          refBRS: "BRS-FLEX-613", refRule: "BRSFLEX613-6" 
        },
        { 
          stepId: "MPS-FLEX-600-Sc4.8", role: "Elleverantör", action: "Ta emot Volym", 
          description: "Elleverantör har mottagit flexibilitetsvolym.", 
          refBRS: "BRS-FLEX-613", refRule: "BRSFLEX613-7" 
        }
      ]
    }
  ]
};

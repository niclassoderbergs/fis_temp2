
import { MPSData } from '../../types';

export const mpsFlex500: MPSData = {
  id: "MPS-FLEX-500",
  title: "Hantering av Baseline",
  domain: "Domän 5: Baseline",
  purpose: "Att hantera processer för referenskurvor (baseline). Detta inkluderar definition av godkända metoder och konfiguration av resurser (val av metod).",
  trigger: "Behov av konfiguration av ny resurs.",
  scenarios: [
    {
      id: "MPS-FLEX-500-Sc2",
      title: "Konfiguration av Baseline för Resurs",
      description: "SP väljer vilken metod som ska gälla för en specifik resurs (CU). Valet distribueras till berörda marknadsaktörer.",
      diagramCode: `sequenceDiagram
    title MPS-FLEX-500-Sc2: Konfiguration av Baseline
    participant SP as SP
    participant FIS as FIS
    participant SO as Marknadsaktörer (TSO/DSO)

    Note over SP: Beslut: Val av beräkningsmetod för ny resurs
    SP->>FIS: Registrera metodval (BRS-FLEX-511)
    activate FIS
    FIS->>FIS: Lagra konfiguration
    FIS->>SO: Notifiera val av metod (BRS-FLEX-512)
    deactivate FIS`,
      steps: [
        { 
          stepId: "MPS-FLEX-500-Sc2.1", role: "SP", action: "Välj Metod", 
          description: "SP konfigurerar en CU med en vald metod och startdatum.", 
          refBRS: "BRS-FLEX-511", refRule: "BRSFLEX511-1" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.2", role: "FIS", action: "Spara Konfiguration", 
          description: "FIS sparar valet och kopplar det till resursen.", 
          refBRS: "BRS-FLEX-511", refRule: "BRSFLEX511-2" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.3", role: "FIS", action: "Kvittens", 
          description: "FIS bekräftar registreringen till SP.", 
          refBRS: "BRS-FLEX-511", refRule: "BRSFLEX511-3" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.4", role: "System", action: "Trigger Notifiering", 
          description: "Systemet identifierar att en metod valts och initierar notifiering.", 
          refBRS: "BRS-FLEX-512", refRule: "BRSFLEX512-1" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.5", role: "TSO", action: "Ta emot Info", 
          description: "TSO tar emot information om vald baselinemetod.", 
          refBRS: "BRS-FLEX-512", refRule: "BRSFLEX512-2" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.6", role: "DSO", action: "Ta emot Info", 
          description: "DSO tar emot information om vald baselinemetod.", 
          refBRS: "BRS-FLEX-512", refRule: "BRSFLEX512-3" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.7", role: "BRP", action: "Ta emot Info", 
          description: "BRP tar emot information om vald baselinemetod.", 
          refBRS: "BRS-FLEX-512", refRule: "BRSFLEX512-4" 
        },
        { 
          stepId: "MPS-FLEX-500-Sc2.8", role: "Elleverantör", action: "Ta emot Info", 
          description: "Elleverantör tar emot information om vald baselinemetod.", 
          refBRS: "BRS-FLEX-512", refRule: "BRSFLEX512-5" 
        }
      ]
    }
  ]
};

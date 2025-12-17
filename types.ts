
export interface BusinessRule {
  id: string;
  description: string;
  errorCode?: string;
}

export interface ExceptionRule {
  id: string;
  description: string;
  implemented?: string;
}

export interface PostCondition {
  id: string;
  description: string;
}

export interface ProcessStep {
  id: string;
  description: string;
}

export interface PreCondition {
  id: string;
  description: string;
}

export interface InfoAttribute {
  attribute: string;
  description: string;
  article: string;
}

export interface InfoObject {
  title: string;
  attributes: InfoAttribute[];
}

export interface BRSData {
  id: string;
  title: string;
  purpose: string;
  actors: { role: string; description: string }[];
  process: (string | ProcessStep)[];
  exceptionFlow?: ExceptionRule[];
  preConditions: (string | PreCondition)[];
  businessRules: BusinessRule[];
  postConditions: { 
    accepted: string | PostCondition[]; 
    rejected: string | PostCondition[]; 
  };
  infoObjects?: InfoObject[];
  diagramCode?: string;
}

// --- MPS (Market Process Scenario) ---

export interface ProcessStepLink {
  stepId: string;        // T.ex. "1.1"
  role: string;          // T.ex. "SP"
  action: string;        // Kort beskrivning av handlingen
  description: string;   // Utförligare beskrivning
  refBRS?: string;       // T.ex. "BRS-FLEX-101"
  refRule?: string;      // T.ex. "BRSFLEX101-1" (Kan vara Start- eller Slutvillkor)
  isPrerequisite?: boolean; // Ny: Markerar om steget är en förutsättning/trigger utanför kärnprocessen
}

export interface Scenario {
  id: string;            // T.ex. "Sc1"
  title: string;         // T.ex. "Registrering av ny CU"
  description: string;
  steps: ProcessStepLink[];
  diagramCode?: string;  // Ny: Möjliggör diagram per scenario
}

export interface MPSData {
  id: string;            // T.ex. "MPS-FLEX-100"
  title: string;
  domain: string;
  purpose: string;
  trigger: string;
  scenarios: Scenario[];
  actors?: { role: string; description: string }[];
  diagramCode?: string;
}

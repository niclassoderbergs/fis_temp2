
export interface BusinessRule {
  id: string;
  description: string;
  errorCode?: string;
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
  preConditions: (string | PreCondition)[];
  businessRules: BusinessRule[];
  postConditions: { 
    accepted: string | PostCondition[]; 
    rejected: string | PostCondition[]; 
  };
  infoObjects?: InfoObject[];
  diagramCode?: string;
}

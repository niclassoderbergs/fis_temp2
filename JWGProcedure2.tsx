
import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex101 } from './domain1/brs/brs-flex-101';
import { content101Input } from './content-domain-1';

const styles = {
  container: { padding: '40px', backgroundColor: '#fff', minHeight: '100%', boxSizing: 'border-box' as const },
  header: { fontSize: '2rem', fontWeight: 700, marginBottom: '8px', color: '#172b4d' },
  subHeader: { fontSize: '1.1rem', color: '#5e6c84', marginBottom: '32px' },
  sectionHeader: { fontSize: '1.5rem', fontWeight: 600, marginTop: '48px', marginBottom: '16px', color: '#42526e', borderBottom: '2px solid #ebecf0', paddingBottom: '8px' },
  paragraph: { fontSize: '1rem', lineHeight: '1.6', color: '#333', marginBottom: '16px' },
  table: { width: '100%', borderCollapse: 'collapse' as const, boxShadow: '0 1px 3px rgba(0,0,0,0.1)', fontSize: '0.9rem', border: '1px solid #dfe1e6', marginBottom: '24px' },
  th: { backgroundColor: '#f4f5f7', color: '#172b4d', padding: '12px 16px', textAlign: 'left' as const, borderBottom: '2px solid #dfe1e6', fontWeight: 600 },
  td: { padding: '12px 16px', borderBottom: '1px solid #dfe1e6', verticalAlign: 'top' as const, color: '#172b4d', lineHeight: '1.5' },
  backButton: { padding: '8px 16px', backgroundColor: '#e6effc', color: '#0052cc', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 },
  navHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  navButtons: { display: 'flex', gap: '8px' },
  infoBox: { backgroundColor: '#fff7d6', padding: '16px', borderRadius: '4px', borderLeft: '4px solid #ffab00', marginBottom: '24px' },
  brsBox: { backgroundColor: '#e3fcef', padding: '16px', borderRadius: '4px', borderLeft: '4px solid #006644', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brsLink: { color: '#006644', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: '1.1rem' },
  mappingTag: { display: 'inline-block', backgroundColor: '#e3fcef', color: '#006644', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' },
  reverseMappingTag: { display: 'inline-block', backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }
};

const diagramCode = `sequenceDiagram
    title Procedure 2: CU registration
    participant RegP as CU Registration Responsible
    participant CUMA as CU Module Administrator
    participant Cust as Final Customer
    participant DSO as Connecting System Operator
    participant EP as Entitled Parties

    Note over RegP: 2.1 Request for CU registration
    RegP->>CUMA: Info Item D: Request
    activate CUMA
    
    Note over CUMA: 2.2 Validate request
    
    alt Validation Failed
        CUMA-->>RegP: Info Item B: Request rejected
    else Validation Passed
    
        opt Permission Needed
            CUMA->>Cust: 2.3a Request permission
            Cust->>Cust: 2.3b Validate permission
            Cust-->>CUMA: Permission Result
            alt Permission Failed
                CUMA-->>RegP: Info Item B: Permission validation failed
            end
        end
        
        Note over CUMA: 2.4 Store CU identification
        CUMA-->>RegP: Info Item E: 2.5 Send CU identification
        
        Note over RegP: 2.6 Send CU master data
        RegP->>CUMA: Info Item C: Master data
        
        Note over CUMA: 2.6 Receive CU master data
        
        opt Grid Qualification Needed
            CUMA->>DSO: 2.7a Request grid qualification
            DSO->>DSO: 2.7b Validate
            DSO-->>CUMA: Qualification Result
            
            Note over CUMA: 2.7c Notify about CU grid qualification results
            
            alt Qualification Failed
                CUMA-->>RegP: Info Item B: Grid qualification failed
            end
        end
        
        Note over CUMA: 2.8 Notify about registered CU module data
        CUMA-->>RegP: Info Item B: Registered Data
        
        Note over CUMA: 2.9 Notify about successful registration
        CUMA->>EP: Info Item C: Successful registration
    end
    deactivate CUMA`;

const steps = [
  { step: "2.1", action: "Request for CU registration", description: "The CU registration responsible requests the registration of a new CU.", producer: "CU reg. responsible", receiver: "CU module administrator", infoId: "D" },
  { step: "2.2", action: "Validate CU registration request", description: "The CU module administrator validates the request (e.g. syntax, uniqueness).", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "2.3", action: "Manage permissions", description: "If permission is needed, CUMA requests it from the Final Customer.", producer: "CU module administrator", receiver: "Final customer", infoId: "-" },
  { step: "2.4", action: "Store CU identification", description: "CUMA stores the identifier.", producer: "CU module administrator", receiver: "-", infoId: "-" },
  { step: "2.5", action: "Send CU identification", description: "CUMA sends the ID to the registration responsible.", producer: "CU module administrator", receiver: "CU reg. responsible", infoId: "E" },
  { step: "2.6", action: "Send CU master data", description: "Registration responsible provides the full master data for the CU.", producer: "CU reg. responsible", receiver: "CU module administrator", infoId: "C" },
  { step: "2.7", action: "Manage grid qualification", description: "If needed, CUMA requests grid qualification from the Connecting System Operator.", producer: "CU module administrator", receiver: "Connecting system operator", infoId: "-" },
  { step: "2.8", action: "Notify about registered CU module data", description: "CUMA notifies the registration responsible about the final registered data.", producer: "CU module administrator", receiver: "CU reg. responsible", infoId: "B" },
  { step: "2.9", action: "Notify about successful registration", description: "CUMA notifies entitled parties about the new registration.", producer: "CU module administrator", receiver: "Entitled party", infoId: "C" }
];

const attributes = [
  { name: "CU identification", desc: "If available, otherwise generated by system." },
  { name: "Service provider", desc: "Identification of the service provider responsible for the CU." },
  { name: "Accounting point identifier(s)", desc: "Identifier of the accounting point(s) the CU is connected to." },
  { name: "Technical characteristics", desc: "Maximum capacity, ramp rates, etc." },
  { name: "Active time period", desc: "Start date for the registration." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Accounting point identifier(s)": "Mätpunkt-ID",
  "Technical characteristics": "Maximal aktiv effekt",
  "Active time period": "Aktiv tidsperiod",
  "Service provider": "Resursnamn"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure2: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    return content101Input.attributes.find(a => a.attribute === mappedName);
  };

  // Helper to find JWG name from BRS attribute name (Reverse lookup)
  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(1)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(3)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 2: Registration of a Controllable Unit</h1>
      <p style={styles.subHeader}>Process för att registrera en ny resurs i systemet.</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex101.id)}>{brsFlex101.id}: {brsFlex101.title}</div>
        </div>
        <div style={{fontSize: '2rem', opacity: 0.2}}>🔗</div>
      </div>

      <div style={styles.infoBox}><strong>Pre-condition:</strong> The Service Provider has a valid contract with the CU Owner (implied).</div>

      <section><h2 style={styles.sectionHeader}>Processflöde</h2><MermaidDiagram chart={diagramCode} /></section>

      <section>
        <h2 style={styles.sectionHeader}>Steg i processen (Table III.2)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Steg</th><th style={styles.th}>Handling</th><th style={styles.th}>Beskrivning</th><th style={styles.th}>Avsändare</th><th style={styles.th}>Mottagare</th><th style={styles.th}>Info ID</th></tr></thead>
          <tbody>
            {steps.map((s, i) => (
              <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                <td style={styles.td}><strong>{s.step}</strong></td><td style={styles.td}>{s.action}</td><td style={styles.td}>{s.description}</td><td style={styles.td}>{s.producer}</td><td style={styles.td}>{s.receiver}</td><td style={styles.td}><strong>{s.infoId}</strong></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll JWG: Info Object A</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex101.id}</th></tr></thead>
          <tbody>
            {attributes.map((a, i) => {
              const brsMatch = getBrsAttribute(a.name);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{a.name}</strong><br/><span style={{fontSize:'0.8rem', color:'#666'}}>{a.desc}</span></td>
                  <td style={styles.td}>{brsMatch ? <span style={styles.mappingTag}>{brsMatch.attribute}</span> : '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS</h2>
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex101.id} (InfoObject: {content101Input.title}). Här visas vilka JWG-krav som attributet uppfyller.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content101Input.attributes.map((attr, i) => {
              const jwgRef = getJwgReference(attr.attribute);
              return (
                <tr key={i} style={i % 2 !== 0 ? { backgroundColor: '#f9f9f9' } : {}}>
                  <td style={styles.td}><strong>{attr.attribute}</strong></td>
                  <td style={styles.td}>{attr.description}</td>
                  <td style={{...styles.td, backgroundColor: i % 2 !== 0 ? '#f4f8fd' : '#fff'}}>
                    {jwgRef ? (
                        <span style={styles.reverseMappingTag}>{jwgRef}</span>
                    ) : (
                        <span style={{color: '#999', fontStyle: 'italic', fontSize: '0.8rem'}}>- (Specifikt för BRS)</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};


import React from 'react';
import { MermaidDiagram } from './MermaidDiagram';
import { brsFlex701 } from './domain7/brs/brs-flex-701';
import { brsFlex711 } from './domain7/brs/brs-flex-711';
import { content701Input, content711Input } from './content-domain-7';

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
  brsBox: { backgroundColor: '#e3fcef', padding: '16px', borderRadius: '4px', borderLeft: '4px solid #006644', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' },
  brsLink: { color: '#006644', fontWeight: 700, textDecoration: 'underline', cursor: 'pointer', fontSize: '1.1rem', display: 'block', marginBottom: '4px' },
  mappingTag: { display: 'inline-block', backgroundColor: '#e3fcef', color: '#006644', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' },
  reverseMappingTag: { display: 'inline-block', backgroundColor: '#e6effc', color: '#0052cc', padding: '2px 6px', borderRadius: '3px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '4px' }
};

const diagramCode = `sequenceDiagram
    title Procedure 29: Bidding and activation of a flexibility product
    participant SP as Service provider
    participant PSO as Procuring system operator

    Note over SP: 29.1 Send Bid[s]
    SP->>PSO: Info Item BT: Bid(s)
    activate PSO
    
    Note over PSO: 29.2 Validate received bid[s]
    
    alt Validation Failed
        PSO-->>SP: Info Item B: Error notification
    else Validation Passed
        Note over PSO: 29.3 Execute selection of bids
        
        Note over PSO: 29.4 Notify selected bid[s] to the Service Provider
        PSO-->>SP: Info Item CI: Selected bids
        
        par Activation (Conditional)
            Note over PSO: 29.5 Send an activation message of selected bid[s]
            PSO->>SP: Info Item BU: Activation message
            Note over SP: 29.5 Receive an activation message of selected bid
        and Rejection (Conditional)
            Note over PSO: 29.6 Notify Information about rejected bid
            PSO-->>SP: Info Item BV: Rejected bid info
        end
    end
    deactivate PSO`;

const steps = [
  { step: "29.1", action: "Send Bid[s]", description: "The Service Provider sends one or more bids to the Procuring System Operator.", producer: "Service provider", receiver: "Procuring system operator", infoId: "BT" },
  { step: "29.2", action: "Validate received bid[s]", description: "The Procuring System Operator validates the bids.", producer: "Procuring system operator", receiver: "-", infoId: "-" },
  { step: "29.3", action: "Execute selection of bids", description: "The Procuring System Operator selects the bids to be activated based on market rules.", producer: "Procuring system operator", receiver: "-", infoId: "-" },
  { step: "29.4", action: "Notify selected bid[s] to the Service Provider", description: "The Procuring System Operator notifies the SP about which bids were selected.", producer: "Procuring system operator", receiver: "Service provider", infoId: "CI" },
  { step: "29.5", action: "Send/Receive an activation message of selected bid[s]", description: "Conditional: If activation is required, the Operator sends an activation signal.", producer: "Procuring system operator", receiver: "Service provider", infoId: "BU" },
  { step: "29.6", action: "Notify Information about rejected bid", description: "Conditional: If applicable, the Operator notifies about rejected bids.", producer: "Procuring system operator", receiver: "Service provider", infoId: "BV" }
];

const attributes = [
  { name: "Bid ID", desc: "Unique identifier for the bid." },
  { name: "Product", desc: "The product being traded." },
  { name: "Volume", desc: "Quantity (MW)." },
  { name: "Price", desc: "Price (EUR)." },
  { name: "Activation ID", desc: "Identifier for the activation (Info Item BU)." },
  { name: "Activated Volume", desc: "Volume to deliver (Info Item BU)." }
];

const jwgToBrsMapping: Record<string, string> = {
  "Bid ID": "Bud-ID",
  "Product": "Produkt",
  "Volume": "Volym",
  "Price": "Pris",
  "Activation ID": "Aktiverings-ID",
  "Activated Volume": "Aktiverad Volym"
};

interface Props { 
    onBack: () => void; 
    onNavigateToBRS: (id: string) => void;
    onNavigateToProcedure: (id: number) => void;
}

export const JWGProcedure29: React.FC<Props> = ({ onBack, onNavigateToBRS, onNavigateToProcedure }) => {
  const getBrsAttribute = (jwgAttrName: string) => {
    const mappedName = jwgToBrsMapping[jwgAttrName];
    if (!mappedName) return null;
    
    // Check Bid data (701)
    let attr = content701Input.attributes.find(a => a.attribute === mappedName);
    // Check Activation data (711)
    if (!attr) attr = content711Input.attributes.find(a => a.attribute === mappedName);
    
    return attr;
  };

  const getJwgReference = (brsAttrName: string) => {
    return Object.keys(jwgToBrsMapping).find(key => jwgToBrsMapping[key] === brsAttrName);
  };

  return (
    <div style={styles.container}>
      <div style={styles.navHeader}>
        <button style={styles.backButton} onClick={onBack}>← Tillbaka till listan</button>
        <div style={styles.navButtons}>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(28)}>← Föregående</button>
            <button style={styles.backButton} onClick={() => onNavigateToProcedure(30)}>Nästa →</button>
        </div>
      </div>

      <h1 style={styles.header}>Procedure 29: Bidding and activation of a flexibility product</h1>
      <p style={styles.subHeader}>Budgivning, marknadsclearing och aktivering (avrop).</p>

      <div style={styles.brsBox}>
        <div>
            <div style={{fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8}}>Implementerad via</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex701.id)}>{brsFlex701.id}: {brsFlex701.title} (Bud)</div>
            <div style={styles.brsLink} onClick={() => onNavigateToBRS(brsFlex711.id)}>{brsFlex711.id}: {brsFlex711.title} (Aktivering)</div>
        </div>
        <div style={{fontSize: '2rem', opacity: 0.2}}>🔗</div>
      </div>

      <section><h2 style={styles.sectionHeader}>Processflöde</h2><MermaidDiagram chart={diagramCode} /></section>

      <section>
        <h2 style={styles.sectionHeader}>Steg i processen</h2>
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
        <h2 style={styles.sectionHeader}>Datainnehåll: Info BT (Bid) & BU (Activation)</h2>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>JWG Attribut</th><th style={styles.th}>Motsvarighet i {brsFlex701.id} / {brsFlex711.id}</th></tr></thead>
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
        <h2 style={styles.sectionHeader}>Datainnehåll BRS (Bud - {brsFlex701.id})</h2>
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex701.id}.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content701Input.attributes.map((attr, i) => {
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

      <section>
        <h2 style={styles.sectionHeader}>Datainnehåll BRS (Aktivering - {brsFlex711.id})</h2>
        <p style={styles.paragraph}>Följande attribut ingår i specifikationen för {brsFlex711.id}.</p>
        <table style={styles.table}>
          <thead><tr><th style={styles.th}>Attribut</th><th style={styles.th}>Beskrivning</th><th style={{...styles.th, backgroundColor: '#e6effc', color: '#0052cc', borderBottom: '2px solid #b3d4ff'}}>JWG Referens</th></tr></thead>
          <tbody>
            {content711Input.attributes.map((attr, i) => {
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


import React from 'react';
import { BRSData } from './types';
import { calculateQuality, QualityReport, SectionScore } from './QualityCalculator';

interface StatusPageProps {
  data: BRSData[];
  onSelectBRS: (id: string) => void;
}

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#fff',
    minHeight: '100%',
    boxSizing: 'border-box' as const
  },
  header: {
    fontSize: '2rem',
    fontWeight: 700,
    marginBottom: '24px',
    color: '#172b4d'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    fontSize: '0.85rem'
  },
  th: {
    backgroundColor: '#f4f5f7',
    color: '#172b4d',
    padding: '12px 12px',
    textAlign: 'left' as const,
    borderBottom: '2px solid #dfe1e6',
    fontWeight: 600,
    position: 'sticky' as const,
    top: 0
  },
  td: {
    padding: '8px 12px',
    borderBottom: '1px solid #dfe1e6',
    color: '#333',
    verticalAlign: 'middle' as const
  },
  idCell: {
    fontFamily: 'monospace',
    fontWeight: 600,
    color: '#0052cc',
    cursor: 'pointer'
  },
  scoreCell: {
    textAlign: 'center' as const,
    fontWeight: 500,
    width: '80px',
    cursor: 'help'
  },
  cellInner: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '4px',
    minWidth: '36px',
    fontSize: '0.8rem'
  }
};

const getScoreColor = (score: number) => {
  if (score === 100) return { bg: '#e3fcef', color: '#006644' }; // Green
  if (score >= 80) return { bg: '#fff0b3', color: '#172b4d' }; // Yellow
  if (score >= 50) return { bg: '#ffebd6', color: '#974f0c' }; // Orange
  return { bg: '#ffebe6', color: '#bf2600' }; // Red
};

const ScoreDisplay = ({ data }: { data: SectionScore }) => {
  const colors = getScoreColor(data.score);
  const tooltip = data.issues.length > 0 
    ? data.issues.join('\n') 
    : 'OK';

  return (
    <span 
      title={tooltip}
      style={{ 
        ...styles.cellInner, 
        backgroundColor: colors.bg, 
        color: colors.color 
      }}>
      {data.score}%
    </span>
  );
};

export const StatusPage: React.FC<StatusPageProps> = ({ data, onSelectBRS }) => {
  // Sortera listan på ID
  const sortedData = [...data].sort((a, b) => a.id.localeCompare(b.id));

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Quality Assurance Dashboard</h1>
      <p style={{marginBottom: '24px', color: '#666'}}>
        Kvalitetskontroll av samtliga BRS-dokument. Hovra över en siffra för att se avvikelser.
      </p>
      
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Titel</th>
            <th style={{...styles.th, textAlign: 'center'}}>Syfte</th>
            <th style={{...styles.th, textAlign: 'center'}}>Diagram</th>
            <th style={{...styles.th, textAlign: 'center'}}>Start</th>
            <th style={{...styles.th, textAlign: 'center'}}>Stopp</th>
            <th style={{...styles.th, textAlign: 'center'}}>Regler</th>
            <th style={{...styles.th, textAlign: 'center'}}>Flöde</th>
            <th style={{...styles.th, textAlign: 'center'}}>Data</th>
            <th style={{...styles.th, textAlign: 'center'}}>Totalt</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(brs => {
            const report: QualityReport = calculateQuality(brs);
            const totalColor = getScoreColor(report.total);
            
            return (
              <tr key={brs.id}>
                <td style={styles.td}>
                  <span style={styles.idCell} onClick={() => onSelectBRS(brs.id)}>
                    {brs.id}
                  </span>
                </td>
                <td style={styles.td}>{brs.title}</td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.purpose} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.diagram} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.startConditions} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.stopConditions} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.businessRules} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.flows} /></td>
                <td style={styles.scoreCell}><ScoreDisplay data={report.content} /></td>
                <td style={{...styles.td, textAlign: 'center', fontWeight: 700, color: totalColor.color}}>
                   {report.total}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

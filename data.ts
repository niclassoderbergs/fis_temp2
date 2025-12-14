
import { BRSData } from './types';
import { brsFlex101 } from './brs-flex-101';
import { brsFlex102 } from './brs-flex-102';
import { brsFlex103 } from './brs-flex-103';
import { brsFlex1040 } from './brs-flex-1040';
import { brsFlex110 } from './brs-flex-110';
import { brsFlex1110 } from './brs-flex-1110';
import { brsFlex120 } from './brs-flex-120';
import { brsFlex1210 } from './brs-flex-1210';
import { brsFlex130 } from './brs-flex-130';
import { brsFlex131 } from './brs-flex-131';
import { brsFlex1310 } from './brs-flex-1310';
import { brsFlex1320 } from './brs-flex-1320';
import { brsFlex134 } from './brs-flex-134';
import { brsFlex140 } from './brs-flex-140';
import { brsFlex141 } from './brs-flex-141';
import { brsFlex1410 } from './brs-flex-1410';
import { brsFlex1420 } from './brs-flex-1420';
import { brsFlex144 } from './brs-flex-144';
import { brsFlex201 } from './brs-flex-201';
import { brsFlex202 } from './brs-flex-202';
import { brsFlex203 } from './brs-flex-203';
import { brsFlex2040 } from './brs-flex-2040';
import { brsFlex205 } from './brs-flex-205';
import { brsFlex206 } from './brs-flex-206';
import { brsFlex301 } from './brs-flex-301';
import { brsFlex302 } from './brs-flex-302';
import { brsFlex303 } from './brs-flex-303';
import { brsFlex311 } from './brs-flex-311';
import { brsFlex312 } from './brs-flex-312';
import { brsFlex313 } from './brs-flex-313';
import { brsFlex321 } from './brs-flex-321';
import { brsFlex322 } from './brs-flex-322';
import { brsFlex323 } from './brs-flex-323';
import { brsFlex324 } from './brs-flex-324';
import { brsFlex401 } from './brs-flex-401'; // Corrected file path
import { brsFlex402 } from './brs-flex-402'; // Corrected file path
import { brsFlex403 } from './brs-flex-403';
// Domain 5 imports
import { brsFlex501 } from './brs-flex-501';
import { brsFlex502 } from './brs-flex-502';
import { brsFlex503 } from './brs-flex-503';
import { brsFlex511 } from './brs-flex-511';
import { brsFlex512 } from './brs-flex-512';
import { brsFlex521 } from './brs-flex-521';
import { brsFlex522 } from './brs-flex-522';
import { brsFlex5210 } from './brs-flex-5210';

// Domain 6
import { brsFlex601 } from './brs-flex-601';
import { brsFlex602 } from './brs-flex-602';
import { brsFlex603 } from './brs-flex-603';
import { brsFlex611 } from './brs-flex-611';
import { brsFlex6110 } from './brs-flex-6110';
import { brsFlex612 } from './brs-flex-612';
import { brsFlex613 } from './brs-flex-613';
import { brsFlex622 } from './brs-flex-622';

// Domain 7
import { brsFlex701 } from './brs-flex-701';
import { brsFlex702 } from './brs-flex-702';
import { brsFlex705 } from './brs-flex-705';
import { brsFlex706 } from './brs-flex-706';
import { brsFlex711 } from './brs-flex-711';
import { brsFlex712 } from './brs-flex-712';
import { brsFlex713 } from './brs-flex-713';
import { brsFlex715 } from './brs-flex-715';
import { brsFlex716 } from './brs-flex-716';
import { brsFlex721 } from './brs-flex-721';
import { brsFlex722 } from './brs-flex-722';
import { brsFlex723 } from './brs-flex-723';
import { brsFlex7011 } from './brs-flex-7011';
import { brsFlex7110 } from './brs-flex-7110';
import { brsFlex7120 } from './brs-flex-7120';
import { brsFlex7121 } from './brs-flex-7121';

export const brsList: BRSData[] = [
  // Domän 1: Master data och aggregeringsobjekt
  brsFlex101,
  brsFlex102,
  brsFlex103,
  brsFlex110,
  brsFlex120,
  brsFlex130,
  brsFlex131,
  brsFlex134,
  brsFlex140,
  brsFlex141,
  brsFlex144,
  // Interna funktioner
  brsFlex1040,
  brsFlex1110,
  brsFlex1210,
  brsFlex1310,
  brsFlex1320,
  brsFlex1410,
  brsFlex1420,

  // Domän 2: Avtal & Marknad
  brsFlex201,
  brsFlex202,
  brsFlex203,
  brsFlex2040,
  brsFlex205,
  brsFlex206,

  // Domän 3: Produkt & Kvalificering
  brsFlex301,
  brsFlex302,
  brsFlex303,
  brsFlex311,
  brsFlex312,
  brsFlex313,
  brsFlex321,
  brsFlex322,
  brsFlex323,
  brsFlex324,

  // Domän 4: Nätbegränsningar
  brsFlex401,
  brsFlex402,
  brsFlex403,

  // Domän 5: Baseline
  brsFlex501,
  brsFlex502,
  brsFlex503,
  brsFlex511,
  brsFlex512,
  brsFlex521,
  brsFlex522,
  brsFlex5210,
  
  // Domän 6: Mätvärden
  brsFlex601,
  brsFlex602,
  brsFlex603,
  brsFlex611,
  brsFlex6110,
  brsFlex612,
  brsFlex613,
  brsFlex622,

  // Domän 7: Verifiering & Budgivning
  brsFlex701,  // TSO Register Balancing Bid
  brsFlex702,  // DSO Register Local Flex Bid
  brsFlex705,  // TSO Notify Capacity Result (Legacy 7012 specific)
  brsFlex706,  // DSO Notify Capacity Result (Legacy 7012 specific)
  brsFlex711,  // TSO Register Activated Energy
  brsFlex712,  // DSO Register Activated Energy
  brsFlex713,  // NEMO Register DA/ID Trade
  brsFlex715,  // TSO Notify Verified Energy
  brsFlex716,  // DSO Notify Verified Energy
  brsFlex721,  // TSO Notify Imbalance Adj
  brsFlex722,  // BRP Notify Imbalance Adj
  brsFlex723,  // Supplier Notify Compensation
  brsFlex7011, // FIS Check Capacity
  brsFlex7110, // FIS Verify Activated Energy
  brsFlex7120, // FIS Allocate Volume BRP
  brsFlex7121  // FIS Allocate Volume Supplier
];

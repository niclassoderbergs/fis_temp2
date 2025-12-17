
import { BRSData, MPSData } from './types';

// Domän 1: Master Data
import { brsFlex101 } from './domain1/brs/brs-flex-101';
import { brsFlex102 } from './domain1/brs/brs-flex-102';
import { brsFlex103 } from './domain1/brs/brs-flex-103';
import { brsFlex1040 } from './domain1/brs/brs-flex-1040';
import { brsFlex110 } from './domain1/brs/brs-flex-110';
import { brsFlex111 } from './domain1/brs/brs-flex-111';
import { brsFlex1110 } from './domain1/brs/brs-flex-1110';
import { brsFlex120 } from './domain1/brs/brs-flex-120';
import { brsFlex121 } from './domain1/brs/brs-flex-121';
import { brsFlex1210 } from './domain1/brs/brs-flex-1210';
import { brsFlex130 } from './domain1/brs/brs-flex-130';
import { brsFlex131 } from './domain1/brs/brs-flex-131';
import { brsFlex1310 } from './domain1/brs/brs-flex-1310';
import { brsFlex1320 } from './domain1/brs/brs-flex-1320';
import { brsFlex134 } from './domain1/brs/brs-flex-134';
import { brsFlex140 } from './domain1/brs/brs-flex-140';
import { brsFlex141 } from './domain1/brs/brs-flex-141';
import { brsFlex1420 } from './domain1/brs/brs-flex-1420';
import { brsFlex144 } from './domain1/brs/brs-flex-144';

// MPS Domain 1
import { mpsFlex100, mpsFlex110, mpsFlex130, mpsFlex140 } from './domain1/mps/mps-domain-1';

// Domän 2: Avtal & Marknad
import { brsFlex201 } from './domain2/brs/brs-flex-201';
import { brsFlex202 } from './domain2/brs/brs-flex-202';
import { brsFlex203 } from './domain2/brs/brs-flex-203';
import { brsFlex2040 } from './domain2/brs/brs-flex-2040';
import { brsFlex205 } from './domain2/brs/brs-flex-205';
import { brsFlex206 } from './domain2/brs/brs-flex-206';

// MPS Domain 2
import { mpsFlex200 } from './domain2/mps/mps-domain-2';

// Domän 3: Produkt & Kvalificering
import { brsFlex301 } from './domain3/brs/brs-flex-301';
import { brsFlex302 } from './domain3/brs/brs-flex-302';
import { brsFlex303 } from './domain3/brs/brs-flex-303';
import { brsFlex311 } from './domain3/brs/brs-flex-311';
import { brsFlex312 } from './domain3/brs/brs-flex-312';
import { brsFlex313 } from './domain3/brs/brs-flex-313';
import { brsFlex314 } from './domain3/brs/brs-flex-314';
import { brsFlex321 } from './domain3/brs/brs-flex-321';
import { brsFlex322 } from './domain3/brs/brs-flex-322';
import { brsFlex323 } from './domain3/brs/brs-flex-323';
import { brsFlex324 } from './domain3/brs/brs-flex-324';

// MPS Domain 3
import { mpsFlex300 } from './domain3/mps/mps-domain-3';

// Domän 4: Nätbegränsningar
import { brsFlex401 } from './domain4/brs/brs-flex-401';
import { brsFlex402 } from './domain4/brs/brs-flex-402';
import { brsFlex403 } from './domain4/brs/brs-flex-403';

// MPS Domain 4
import { mpsFlex400 } from './domain4/mps/mps-domain-4';

// Domän 5: Baseline
import { brsFlex501 } from './domain5/brs/brs-flex-501';
import { brsFlex502 } from './domain5/brs/brs-flex-502';
import { brsFlex503 } from './domain5/brs/brs-flex-503';
import { brsFlex511 } from './domain5/brs/brs-flex-511';
import { brsFlex512 } from './domain5/brs/brs-flex-512';
import { brsFlex521 } from './domain5/brs/brs-flex-521';
import { brsFlex5210 } from './domain5/brs/brs-flex-5210';
import { brsFlex522 } from './domain5/brs/brs-flex-522';

// MPS Domain 5
import { mpsFlex500 } from './domain5/mps/mps-domain-5';

// Domän 6: Mätvärden
import { brsFlex601 } from './domain6/brs/brs-flex-601';
import { brsFlex602 } from './domain6/brs/brs-flex-602';
import { brsFlex603 } from './domain6/brs/brs-flex-603';
import { brsFlex611 } from './domain6/brs/brs-flex-611';
import { brsFlex6110 } from './domain6/brs/brs-flex-6110';
import { brsFlex612 } from './domain6/brs/brs-flex-612';
import { brsFlex613 } from './domain6/brs/brs-flex-613';
import { brsFlex622 } from './domain6/brs/brs-flex-622';

// MPS Domain 6
// Added missing import for mpsFlex600
import { mpsFlex600 } from './domain6/mps/mps-domain-6';

// Domän 7: Verifiering & Budgivning
import { brsFlex701 } from './domain7/brs/brs-flex-701';
import { brsFlex702 } from './domain7/brs/brs-flex-702';
import { brsFlex7011 } from './domain7/brs/brs-flex-7011';
import { brsFlex705 } from './domain7/brs/brs-flex-705';
import { brsFlex706 } from './domain7/brs/brs-flex-706';
import { brsFlex711 } from './domain7/brs/brs-flex-711';
import { brsFlex712 } from './domain7/brs/brs-flex-712';
import { brsFlex713 } from './domain7/brs/brs-flex-713';
import { brsFlex7110 } from './domain7/brs/brs-flex-7110';
import { brsFlex7120 } from './domain7/brs/brs-flex-7120';
import { brsFlex7121 } from './domain7/brs/brs-flex-7121';
import { brsFlex714 } from './domain7/brs/brs-flex-714'; // New
import { brsFlex715 } from './domain7/brs/brs-flex-715';
import { brsFlex716 } from './domain7/brs/brs-flex-716';
import { brsFlex721 } from './domain7/brs/brs-flex-721';
import { brsFlex722 } from './domain7/brs/brs-flex-722';
import { brsFlex723 } from './domain7/brs/brs-flex-723';

// MPS Domain 7
import { mpsFlex700, mpsFlex710, mpsFlex720 } from './domain7/mps/mps-domain-7';

export const brsList: BRSData[] = [
  // Domän 1: Master data och aggregeringsobjekt
  brsFlex101, brsFlex102, brsFlex103, brsFlex1040, brsFlex110, brsFlex111, brsFlex1110, brsFlex120, brsFlex121, brsFlex1210, brsFlex130, brsFlex131, brsFlex1310, brsFlex1320, brsFlex134, brsFlex140, brsFlex141, brsFlex1420, brsFlex144,
  // Domän 2: Avtal & Marknad
  brsFlex201, brsFlex202, brsFlex203, brsFlex2040, brsFlex205, brsFlex206,
  // Domän 3: Produkt & Kvalificering
  brsFlex301, brsFlex302, brsFlex303, brsFlex311, brsFlex312, brsFlex313, brsFlex314, brsFlex321, brsFlex322, brsFlex323, brsFlex324,
  // Domän 4: Nätbegränsningar
  brsFlex401, brsFlex402, brsFlex403,
  // Domän 5: Baseline
  brsFlex501, brsFlex502, brsFlex503, brsFlex511, brsFlex512, brsFlex521, brsFlex5210, brsFlex522,
  // Domän 6: Mätvärden
  brsFlex601, brsFlex602, brsFlex603, brsFlex611, brsFlex6110, brsFlex612, brsFlex613, brsFlex622,
  // Domän 7: Verifiering & Budgivning
  brsFlex701, brsFlex702, brsFlex7011, brsFlex705, brsFlex706, brsFlex711, brsFlex712, brsFlex713, brsFlex7110, brsFlex7120, brsFlex7121, brsFlex714, brsFlex715, brsFlex716, brsFlex721, brsFlex722, brsFlex723
];

export const mpsList: MPSData[] = [
  mpsFlex100, mpsFlex110, mpsFlex130, mpsFlex140, mpsFlex200, mpsFlex300, mpsFlex400, mpsFlex500, mpsFlex600, mpsFlex700, mpsFlex710, mpsFlex720
];

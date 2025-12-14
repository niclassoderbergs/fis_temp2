
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
import { brsFlex210 } from './brs-flex-210';
import { brsFlex301 } from './brs-flex-301';
import { brsFlex302 } from './brs-flex-302';
import { brsFlex303 } from './brs-flex-303';
import { brsFlex311 } from './brs-flex-311';
import { brsFlex312 } from './brs-flex-312';
import { brsFlex313 } from './brs-flex-313';
import { brsFlex321 } from './brs-flex-321';
import { brsFlex322 } from './brs-flex-322';
import { brsFlex323 } from './brs-flex-323';
import { brsFlex324 } from './brs-flex-324'; // New BRS
import { brsFlex401 } from './brs-flex-400';
import { brsFlex402 } from './brs-flex-401';
import { brsFlex403 } from './brs-flex-403';
import { brsFlex601 } from './brs-flex-402';
import { brsFlex500 } from './brs-flex-500';
import { brsFlex501 } from './brs-flex-501';
import { brsFlex502 } from './brs-flex-502';
import { brsFlex503 } from './brs-flex-503';

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
  brsFlex205,
  brsFlex206,
  brsFlex2040,

  // Domän 3: Produkt & Kvalificering
  brsFlex301, // Register Product
  brsFlex302, // List Products
  brsFlex303, // Get Product Details
  brsFlex311, // Request Product Qual
  brsFlex312, // Update Product Qual
  brsFlex313, // Notify Product Qual
  brsFlex321, // Request Grid Qual
  brsFlex322, // Update Grid Qual
  brsFlex323, // Notify Grid Qual
  brsFlex324, // Notify DSO Grid Qual Request

  // Domän 4: Nätbegränsningar
  brsFlex401,
  brsFlex402,
  brsFlex403,

  // Domän 5: Baseline
  brsFlex500,
  brsFlex501,
  brsFlex502,
  brsFlex503,

  // Domän 6: Verifiering
  brsFlex210,
  brsFlex601
];

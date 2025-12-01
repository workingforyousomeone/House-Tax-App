import { User, Household, FloorDetail } from '../types';

export const USERS: User[] = [
  { id: 'admin', name: 'System Admin', password: 'admin', phone: '0000000000', role: 'ADMIN', clusters: [] }, // Admin sees all
  { id: '10190758-WEA', clusters: ['C4', 'C2'], phone: '7671066475', password: '7671066475', name: 'LABHANA VENKATESH', role: 'USER' },
  { id: '10190758-ENA', clusters: ['C3', 'C8'], phone: '9642956542', password: '9642956542', name: 'BORRA ROJA', role: 'USER' },
  { id: '10190758-DA', clusters: ['C7', 'C14'], phone: '9573322733', password: '9573322733', name: 'KARINI SRIKANTH', role: 'USER' },
  { id: '10190758-VAA', clusters: ['C10', 'C13'], phone: '7036171656', password: '7036171656', name: 'NARAVA SATYANARAYANA', role: 'USER' },
  { id: '10190758-ANM', clusters: ['C12', 'C11'], phone: '8106523044', password: '8106523044', name: 'TALACHINTALA PADMAVATHI', role: 'USER' },
  { id: '10190758-VSA', clusters: ['C1', 'C9'], phone: '6281855310', password: '6281855310', name: 'NAGARAJU MADHU', role: 'USER' },
  { id: '10190758-VRO', clusters: ['C16', 'C15'], phone: '9441567573', password: '9441567573', name: 'BADIREDDY PHANI BHUSHAN RAO', role: 'USER' },
  { id: '10190758-MSK', clusters: ['C5', 'C6'], phone: '9848664454', password: '9848664454', name: 'Y L KRISHNA KUMARI', role: 'USER' },
  { id: '10190759-PS', clusters: ['C29', 'C30'], phone: '9701844126', password: '9701844126', name: 'K RAMANARAYANA', role: 'USER' },
  { id: '10190759-WEA', clusters: ['C32', 'C31'], phone: '8074105015', password: '8074105015', name: 'MARRI SUJATHA RANI', role: 'USER' },
  { id: '10190759-DA', clusters: ['C24', 'C23'], phone: '9110301375', password: '9110301375', name: 'KOTTAKOTA PUSHPAVATHI', role: 'USER' },
  { id: '10190759-ENA', clusters: ['C22', 'C20'], phone: '8500590289', password: '8500590289', name: 'VARANASI MANI KUMAR', role: 'USER' },
  { id: '10190759-ANM', clusters: ['C28', 'C25'], phone: '7993965147', password: '7993965147', name: 'KARANAM MANGAMMA', role: 'USER' },
  { id: '10190759-MSK', clusters: ['C17', 'C18'], phone: '8331905519', password: '8331905519', name: 'BASWA PADMAJA', role: 'USER' },
  { id: '10190759-VSA', clusters: ['C19', 'C21'], phone: '7093419486', password: '7093419486', name: 'GORLE SANDHYA RANI', role: 'USER' },
  { id: '10190759-VRO', clusters: ['C26', 'C27'], phone: '9505144407', password: '9505144407', name: 'MONANGI ROJA RAMANI', role: 'USER' },
];

// Full dataset provided
const CSV_DATA = `
211320000001,1,BURADA MANGANNA,BURADA RAMINAIDU,C1,7702048386,356159908697,1-1-1/A,1,37,10,RCC,,,,,,,327,332,0,
211320000002,3,YENUGUTHALA SRIRAM MURTHY,YENUGUTHALA SATYAM,C1,8186958188,904596089979,1-1-3/A,1,32,10,RCC,,,,,,,201,0,0,
211320000003,5,JADDU RAMANA,JADDU PAPINAIDU,C1,9618921283,,1-1-5/A,1,36,9,RCC,,,,,,,227,0,0,
211320000040,40,CHADUVULA RAMANAMURTHY,CHADUVULA SURYARAO,C2,8374443030,712558444127,1-2-40/A,1,42,14,RCC,,,,,,,402,0,
211320000041,41,PEDDINTI KRISHNA,PEDDINTI APPALASURI,C2,9963383823,794177351560,1-2-1/A,1,40,10,RCC,,,,,,,272,0,
211320000042,42,PEDDINTI SATYANARAYANA,PEDDINTI APPALASAURI,C2,7569690344,636430196996,1-2-2/A,1,40,10,RCC,,,,,,,272,0,
211320000088,88,MAKKA RAMANA,MAKKA KURMINAIDU,C3,7032440406,725016740868,1-3-7/A,1,40,11,RCC,,,,,,,295,281,
211320000089,89,SAJUBILLI SURYANARAYANA NAIDU,SAJUBILLI KURAMAYYA,C3,8688850544,495083417433,1-3-8/A,1,40,11,RCC,,,,,,,282,0,
211320000090,90,MAKKA SANKARARAO,MAKKA KURMINAIDU,C3,9390884700,372886098516,1-3-9/A,1,40,10,RCC,,,,,,,267,255,
211320000126,126,POGIRI NAGARAJU,POGIRI PARVATHI,C4,8498915036,564583916473,1-4-11/A,1,35,11,TILE ROOF,,,,,,,208,197,
211320000127,127,POGIRI GOWRI NAIDU,POGIRI SURIDAMMA,C4,9951541727,825310794201,1-4-12/A,1,39,11,RCC,,,,,,,267,0,
211320000128,128,CH CHANDRA RAO,CH LAXMI,C4,7893095992,431485728084,1-4-13/A,1,39,11,TILE ROOF,,,,,,,224,0,
211320000200,200,PUNNANA SRIRAMULU,PUNNANA SURAYYA,C5,8688837691,247752415453,1-5-47/A,1,40,10,RCC,,,,,,,247,0,
211320000201,201,PUNNANA SURYANARAYANA,PUNNANA APPALASWAMI,C5,9573698191,292326035681,1-5-51/A,1,40,10,RCC,,,,,,,262,0,
211320000202,202,JADDU APPALANAIDU,JADDU RAMULU,C5,9133769702,332564054568,1-5-52/A,1,40,11,RCC,,,,,,,287,0,
211320000203,203,POTNURU CHEKRAPANI,POTNURU MAHALAXMI,C5,9849440988,368972471069,1-5-53/A,1,21,21,RCC,,,,,,,288,0,
211320000204,204,POTNURU MALLESWARA RAO,POTNURU KILASH,C6,9951043581,627140113326,1-6-1/A,1,40,18,TIN ROOF,,,,,,,389,0,
211320000205,205,SANAPATHI PARASARAMULU,SENAPATHI SURYANARAYANA,C6,9542619157,487869592537,1-6-2/A,1,40,11,RCC,,,,,,,287,0,
211320000206,206,JADDU NARAYANARAO,JADDU SURAYYA,C6,9652075818,700136617662,1-6-3/A,1,40,11,RCC,,,,,,,287,0,
211320000284,284,JADDU SURAPUNAIDU,JADDU APPALARAMANNA,C7,6303429769,883482167003,1-7-49/A,1,25,9,TILE ROOF,,,,,,,123,0,
211320000285,285,JADDU HARIBABU,JADDU JAGANNADAM,C7,9000157397,869241501957,1-7-50/A,1,25,9,TILE ROOF,,,,,,,123,0,
211320000286,286,JADDU JAYAMMA,JADDU SRINIVASARAO,C7,9346253884,268279918429,1-7-51/A,1,25,9,TILE ROOF,,,,,,,123,0,
211320000287,287,SASUPALLI SIMHADRI,SASUPALLI APPALA SWAMI,C8,9866811620,330728239915,1-8-1/A,1,28,11,RCC,,,,,,,201,192,
211320000288,288,VALLURI RAMANA,VALLURI TAMMINAIDU,C8,9676579293,524768391714,1-8-2/A,1,28,11,RCC,,,,,,,201,0,
211320000289,289,BALI APPALANAIDU,BALI SURYANARAYANA,C8,9680035794,269977734868,1-8-3/A,1,28,11,TILE ROOF,,,,,,,168,157,
211320000290,290,PEDDINTI CHINNARAO,APPALASURI,C8,810675054,438448884951,1-8-4/A,1,59,16,RCC,,,,,,,584,0,
211320000291,291,PARUPALLI NARAYANARAO,PARUPALLI SURIBABU,C8,8153894311,542639260122,1-8-5/A,1,27,11,RCC,,,,,,,194,0,
211320000292,292,JADDU LAXMINARAYANA,JADDU APPALASURI,C8,8499944383,612544563052,1-8-6/A,1,27,10,RCC,,,,,,,177,169,
211320000374,374,KAMODALA RAMU,KAMODALA SURYANARAYANA,C9,8008900985,477660292886,1-9-38/A,1,60,30,RCC,,,,,,,1173,1118,
211320000375,375,MAKKA NARAYANARAO,MAKKA PAPINAIDU,C9,9502460002,323898340336,1-9-39/A,1,54,10,RCC,,,,,,,352,334,
211320000376,376,POGIRI VARALAKSHMI,POGIRI APPALASWAMI,C9,7093759845,616995533906,1-9-40/A,1,39,11,RCC,,,,,,,280,0,
211320000377,377,CHILAKALAPALLI RAVANAMMA,CHILAKALAPALLI APPADU,C10,8374947186,966166471917,1-10-1/A,1,36,15,RCC,,,,,,,338,322,
211320000378,378,MANDADI RAVI,MANDADI LAKSHINARAYANA,C10,6303082659,509619533101,1-10-2/A,1,24,7,RCC,,,,,,,109,103,
211320000379,379,MANDADI PRASAD,MANDADI SURYANARAYANA,C10,9866991343,342147515809,1-10-3/A,1,24,8,RCC,,,,,,,123,116,
211320000380,380,MANDADI ALIVELU,MANDADI KRISHNA,C10,9550636481,431248228580,1-10-4/A,1,35,8,RCC,,,,,,,171,162,
211320000478,478,BOMMALI SATTIBABU,BOMMALI BABURAO,C11,9949759545,688734738381,1-11-57/A,1,20,12,RCC,,,,,,,155,148,
211320000479,479,BOMMALI PARUSURAM,BOMMALI BABURAO,C11,7989437397,507050953568,1-11-58/A,1,20,12,RCC,,,,,,,155,148,
211320000480,480,YANDAMURI APPADU,YANDAMURI APPALARAMULU,C11,8096550944,387989929554,1-11-59/A,1,50,10,RCC,,,,,,,326,311,
211320000481,481,BOTSA VENKATARAMANA,BOTSA RAMASWAMI,C11,3449796560,344979656010,1-11-60/A,1,20,10,RCC,,,,,,,129,125,
211320000482,482,KONDETI ADIMMA,KONDETI APPARAO,C12,7842443235,409300883235,1-12-1/A,1,21,9,THATCHED,,,,,,,83,78,
211320000483,483,JADDU ADILAXMI,JADDU JAGANNADAM,C12,7095401338,,1-12-2/A,1,34,13,TILE ROOF,,,,,,,240,228,
211320000484,484,GIRIJALA TAVITI NAIDU,GIRIJALA KANNAYYA,C12,9000511379,,1-12-3/A,1,37,9,TIN ROOF,,,,,,,179,171,
211320000556,556,SENATHI JAMPAYYA,SENATHI RAMAMURTHI,C13,9666970345,981955430367,1-13-35/A,1,38,11,RCC,,,,,,,272,261,
211320000557,557,VAKAMULLU APPALANAIDU,VAKAMULLU SIMMAYYA,C13,8125565223,981955430367,1-13-36/A,1,38,11,RCC,,,,,,,272,261,
211320000558,558,VAKAMULLU CHANDRARAO,VAKAMULLU JAGGARAO,C13,8106528834,514320162289,1-13-37/A,1,38,12,RCC,,,,,,,296,282,
211320000559,559,KADAGALA SRIDEVI,KADAGALA SUDHAKAR,C14,7095985892,817570658431,1-14-1/A,1,50,10,TILE ROOF,,,,,,,269,258,
211320000560,560,KADAGALA SATYAVATI,KADAGALA SANYASI NAIDU,C14,7729095621,981955430367,1-14-2/A,1,50,10,TILE ROOF,,,,,,,269,258,
211320000561,561,KADAGALA BASKAR RAO,KADAGALA APPALA RAMANNA,C14,9542947833,538081304922,1-14-3/A,1,87,10,TILE ROOF,,,,,,,471,449,
211320000648,648,KADAGALA GOWRI NAIDU,KADAGALA SRIRAMULU,C15,8688330544,241674580377,1-15-44/A,1,41,10,TILE ROOF,,,,,,,224,212,
211320000649,649,KADAGALA SRIRAMULU,KADAGALA RAMINAIDU,C15,8688838726,612305830792,1-15-45/A,1,38,11,TILE ROOF,,,,,,,215,206,
211320000650,650,KADAGALA RAMAMURTHI,KADAGALA RAMULU,C15,9908788215,972628721476,1-15-46/A,1,43,9,RCC,,,,,,,252,241,
211320000651,651,VEMPATAPU CHINNAMMADU,VEMPATAPU VEKATARAMANA,C15,9618579949,767274520239,1-15-47/A,1,43,11,RCC,,,,,,,310,294,
211320000652,652,YEJJIPURAPU PENTAYYA,YEJJIPURAPU SATYAM,C15,9346153619,995897219894,1-15-48/A,1,22,6,TILE ROOF,,,,,,,72,0,
211320000653,653,KADAGALA SURIDAMMA,KADAGALA SURYANARAYANA,C16,9502876937,253986937961,1-16-1/A,1,38,9,RCC,,,,,,,207,196,
211320000654,654,KADAGALA GOWRI NAIDU,KADAGALA SURAYYA,C16,8688330544,241674580377,1-16-2/A,1,37,6,TILE ROOF,,,,,,,122,115,
211320000655,655,POGIRI BHUJANGARAO,POGIRI RAMULU,C16,8885429810,692820597204,1-16-3/A,1,38,10,TILE ROOF,,,,,,,204,193,
211320000742,,VAVALAPALLI JANARDANARAO,VAVALAPALLI SANYASINAIDU,C17,8374947191,958330724575,2-1-46/A,1,37,12,TILE ROOF,,,,,,,229,219,
211320000743,743,JADDU SWAMINAIDU,JADDU APPANNA,C17,9182772577,254315968082,2-1-47/A,1,42,10,RCC,,,,,,,275,262,
211320000744,744,POGIRI RAMARAO,POGIRI TAMMINAIDU,C17,9908449075,721072123036,2-1-48/A,1,45,24,RCC,,,,,,,703,670,
211320000745,745,KOMARAPURI DALIYYA,KOMARAPURI SURI,C18,9963034956,708769479800,2-2-1/A,1,39,9,RCC,,,,,,,229,219,
211320000746,746,ANJURI CHINNAMMA,ANJURI APPADU,C18,9515468856,244950665369,2-2-2/A,1,35,7,RCC,,,,,,,158,153,
211320000747,747,KOMARAPURI SANYASI,KOMARAPURI APPALA SURI,C18,8886382674,217597551137,2-2-3/A,1,30,12,RCC,,,,,,,235,225,
211320000748,748,VAJJIPARTHI SRINU,VAJJIPARTHI MANGAYYA,C18,9849819036,407772822964,2-2-4/A,1,31,13,RCC,,,,,,,264,250,
211320000749,749,CHOWDIVADA VENKANNA,CHOWDIVADA LACHHAYYA,C18,8374688352,295776125837,2-2-6/A,1,18,10,THATCHED,,,,,,,74,71,
211320000750,750,KOMARAPURI VENKANNA,KOMARAPURI SURI,C18,9959524481,723981011203,2-2-7/A,1,25,9,RCC,,,,,,,147,140,
`;

const parseCSVData = (): Household[] => {
  const lines = CSV_DATA.trim().split('\n');
  const households: Household[] = [];

  lines.forEach(line => {
    // Basic CSV parsing (assuming no commas in fields for simplicity based on provided data)
    const cols = line.split(',').map(c => c.trim());
    
    // Safety check for empty lines
    if (cols.length < 5) return;

    // Extract basic info
    const assessmentNo = cols[0];
    const oldAssessmentNo = cols[1];
    const ownerName = cols[2];
    const parentName = cols[3];
    const clusterNo = cols[4];
    const phoneNo = cols[5];
    const aadhaarNo = cols[6];
    const hNo = cols[7];
    const noOfFloors = parseInt(cols[8]) || 1;

    // Floors
    const floors: FloorDetail[] = [];
    
    // Floor 1
    if (cols[9] && cols[10]) {
        floors.push({
            floorNo: 1,
            length: parseInt(cols[9]) || 0,
            width: parseInt(cols[10]) || 0,
            houseType: cols[11] || ''
        });
    }
    
    // Floor 2
    if (cols[12] && cols[13]) {
        floors.push({
            floorNo: 2,
            length: parseInt(cols[12]) || 0,
            width: parseInt(cols[13]) || 0,
            houseType: cols[14] || ''
        });
    }

    // Floor 3
    if (cols[15] && cols[16]) {
        floors.push({
            floorNo: 3,
            length: parseInt(cols[15]) || 0,
            width: parseInt(cols[16]) || 0,
            houseType: cols[17] || ''
        });
    }

    // Tax Data (Indices: 18=25-26, 19=24-25, 20=23-24)
    const tax25_26 = parseInt(cols[18]) || 0;
    const tax24_25 = parseInt(cols[19]) || 0;
    const tax23_24 = parseInt(cols[20]) || 0;
    
    const totalTax = tax25_26 + tax24_25 + tax23_24;
    
    // Simulation for collected tax since it's not in CSV
    // We'll make it somewhat consistent: some paid full, some partial, some none.
    // Using a hash of assessment no to keep it consistent on refreshes
    const hash = assessmentNo.split('').reduce((a,b)=>a+b.charCodeAt(0),0);
    let taxCollected = 0;
    if (hash % 3 === 0) taxCollected = totalTax; // Fully Paid
    else if (hash % 3 === 1) taxCollected = Math.floor(totalTax * 0.5); // Partial
    else taxCollected = 0; // Unpaid

    households.push({
        assessmentNo,
        oldAssessmentNo,
        ownerName,
        parentName,
        clusterNo,
        phoneNo,
        aadhaarNo,
        hNo,
        noOfFloors,
        totalLength: floors[0]?.length || 0,
        totalWidth: floors[0]?.width || 0,
        tax2023_24: tax23_24,
        tax2024_25: tax24_25,
        tax2025_26: tax25_26,
        totalTax,
        taxCollected,
        floors
    });
  });

  return households;
};


// Helper to generate realistic data based on the provided structure for clusters NOT in CSV
const generateMockHouseholdsForMissingClusters = (existingClusters: string[]): Household[] => {
  const allClusters = USERS.flatMap(u => u.clusters);
  const clustersToGenerate = Array.from(new Set(allClusters)).filter(c => !existingClusters.includes(c));
  
  const houseTypes = ['RCC', 'Tiled', 'Sheet', 'Hut', 'Apartment'];
  const data: Household[] = [];
  const firstNames = ['Ramesh', 'Suresh', 'Mahesh', 'Lakshmi', 'Padma', 'Krishna', 'Venkatesh', 'Srinu', 'Apparao', 'Sujatha', 'Rani', 'Raju', 'Satya', 'Mani', 'Roja'];
  const lastNames = ['K', 'P', 'M', 'G', 'B', 'V', 'Ch', 'S'];

  clustersToGenerate.forEach((cluster) => {
    // Generate 15 houses per cluster
    for (let i = 0; i < 15; i++) {
      const tax23 = Math.floor(Math.random() * 1500) + 500;
      const tax24 = Math.floor(Math.random() * 1800) + 600;
      const tax25 = Math.floor(Math.random() * 2000) + 700;
      const totalTax = tax23 + tax24 + tax25;
      
      let taxCollected = 0;
      const rand = Math.random();
      if (rand < 0.4) taxCollected = totalTax;
      else if (rand < 0.7) taxCollected = Math.floor(Math.random() * (totalTax - 100));
      else taxCollected = 0;

      const floors: FloorDetail[] = [{
        floorNo: 1,
        length: 30,
        width: 20,
        houseType: 'RCC'
      }];

      data.push({
        assessmentNo: `MOCK-${cluster}-${1000 + i}`,
        oldAssessmentNo: `OLD-${cluster}-${500 + i}`,
        ownerName: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        parentName: `PARENT ${i}`,
        clusterNo: cluster,
        phoneNo: `9999999999`,
        aadhaarNo: `1234-5678-9012`,
        hNo: `${i + 1}`,
        noOfFloors: 1,
        totalLength: 30,
        totalWidth: 20,
        tax2023_24: tax23,
        tax2024_25: tax24,
        tax2025_26: tax25,
        totalTax: totalTax,
        taxCollected: taxCollected,
        floors: floors
      });
    }
  });
  return data;
};

const parsedHouseholds = parseCSVData();
const existingClusters = Array.from(new Set(parsedHouseholds.map(h => h.clusterNo)));
const mockHouseholds = generateMockHouseholdsForMissingClusters(existingClusters);

export const HOUSEHOLDS = [...parsedHouseholds, ...mockHouseholds];

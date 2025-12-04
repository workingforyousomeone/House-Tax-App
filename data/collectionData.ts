import { CollectionRecord } from '../types';

export const COLLECTION_CSV_DATA = `
1,211320000421,421,YENDUVA RAMANA,211320C10-45,20-10-2025,TAX20102025092826192,Citizen Online,UPI(QR Code),2024-25,Arrear,120,10,12,10,12,4,1,169,Success,Settled
2,211320000421,421,YENDUVA RAMANA,211320C10-45,20-10-2025,TAX20102025092826192,Citizen Online,UPI(QR Code),2025-26,Current,126,10,10,13,13,4,1,177,Success,Settled
3,211320001218,1218,SILLA MANMADHA RAO,7-84,24-10-2025,TAX24102025115031896,Panchayat Counter,UPI(QR Code),2024-25,Arrear,1,0,0,0,0,0,0,1,Success,Settled
4,211320001218,1218,SILLA MANMADHA RAO,7-84,24-10-2025,TAX24102025115031896,Panchayat Counter,UPI(QR Code),2025-26,Current,629,50,50,63,63,19,6,880,Success,Settled
5,211320000783,783,POGIRI SURYUDU,6-28,29-10-2025,TAX29102025024811772,Panchayat Counter,UPI(QR Code),2024-25,Arrear,91,7,9,7,9,3,1,127,Success,Settled
6,211320000783,783,POGIRI SURYUDU,6-28,29-10-2025,TAX29102025024811772,Panchayat Counter,UPI(QR Code),2025-26,Current,96,8,8,10,10,3,1,136,Success,Settled
15,211320000036,36,JAMBAVANTHULA KOTARI,211320C1-36,03-12-2025,TAX03122025024539186,Citizen Online,UPI(QR Code),2024-25,Arrear,277,22,28,22,28,8,3,388,Success,Settled
16,211320000036,36,JAMBAVANTHULA KOTARI,211320C1-36,03-12-2025,TAX03122025024539186,Citizen Online,UPI(QR Code),2025-26,Current,291,23,23,29,29,9,3,407,Success,Settled
1,211320000249,249,JADDU VISHNUMURTHI,211320C7-14,11-11-2025,TAX11112025125628234,Panchayat Counter,UPI(QR Code),2025-26,Current,582,47,47,58,58,17,6,815,Success,Settled
2,211320001552,1552,MAKKA TANUSHA,211320C28-55,13-11-2025,TAX13112025011400571,Panchayat Counter,UPI(QR Code),2025-26,Current,463,37,37,46,46,14,5,648,Success,Settled
`;

const parseCollectionData = (): CollectionRecord[] => {
  const lines = COLLECTION_CSV_DATA.trim().split('\n');
  const records: CollectionRecord[] = [];

  lines.forEach(line => {
    const cols = line.split(',').map(c => c.trim());
    if (cols.length < 5) return;

    records.push({
      sNo: cols[0],
      assessmentNo: cols[1],
      oldAssessmentNo: cols[2],
      ownerName: cols[3],
      doorNo: cols[4],
      dateOfPayment: cols[5],
      receiptNo: cols[6],
      paymentSource: cols[7],
      paymentMode: cols[8],
      dueYear: cols[9],
      demandCategory: cols[10],
      houseTax: parseFloat(cols[11]) || 0,
      libraryCess: parseFloat(cols[12]) || 0,
      waterTax: parseFloat(cols[13]) || 0,
      lightningTax: parseFloat(cols[14]) || 0,
      drainageTax: parseFloat(cols[15]) || 0,
      sportsCess: parseFloat(cols[16]) || 0,
      fireTax: parseFloat(cols[17]) || 0,
      totalTax: parseFloat(cols[18]) || 0,
      receiptStatus: cols[19],
      settlementStatus: cols[20]
    });
  });

  return records;
};

export const COLLECTION_RECORDS = parseCollectionData();
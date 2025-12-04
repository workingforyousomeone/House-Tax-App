import { USERS } from './users';
import { HOUSEHOLDS as PARSED_HOUSEHOLDS } from './csvData';
import { COLLECTION_RECORDS } from './collectionData';

// Hydrate households with actual collection data from the register
const HOUSEHOLDS = PARSED_HOUSEHOLDS.map(hh => {
    // Find all successful payments for this assessment number
    const payments = COLLECTION_RECORDS.filter(r => 
        r.assessmentNo === hh.assessmentNo && 
        r.receiptStatus === 'Success'
    );
    
    // Sum up the total tax paid
    const totalPaid = payments.reduce((sum, p) => sum + p.totalTax, 0);
    
    // Use the calculated total from register if available, otherwise fallback to CSV value
    // This ensures that if a payment is made (like in the case of 211320000036), 
    // the household object reflects it immediately.
    return {
        ...hh,
        taxCollected: totalPaid > 0 ? totalPaid : hh.taxCollected
    };
});

export { USERS, HOUSEHOLDS, COLLECTION_RECORDS };
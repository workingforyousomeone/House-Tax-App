import { User } from '../types';

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
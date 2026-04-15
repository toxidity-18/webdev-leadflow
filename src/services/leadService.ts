import { Lead, LeadNote, ActivityHistory, Reminder } from '../types/lead';

const DEMO_IMAGES = {
  bakery: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/332d5ec4-30cc-4eb5-8e57-1d40c91bc140/bakery-lead-image-dd89ff00-1776286535136.webp',
  fashion: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/332d5ec4-30cc-4eb5-8e57-1d40c91bc140/fashion-store-lead-image-304e0ef7-1776286534968.webp',
  salon: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/332d5ec4-30cc-4eb5-8e57-1d40c91bc140/salon-lead-image-3743b6d5-1776286537927.webp',
  carHire: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/332d5ec4-30cc-4eb5-8e57-1d40c91bc140/car-hire-lead-image-54bba4ba-1776286536263.webp',
};

const mockLeads: Lead[] = [
  {
    id: '1',
    businessName: 'Nairobi Heights Bakery',
    contactPerson: 'Jane Kamau',
    phoneNumber: '+254 712 345 678',
    email: 'jane@nairobiheights.com',
    socialMediaLink: 'instagram.com/nairobiheights',
    leadSource: 'Instagram',
    businessType: 'Bakery & Cafe',
    estimatedBudget: 1500,
    projectType: 'E-commerce Website',
    status: 'New',
    followUpDate: new Date().toISOString().split('T')[0],
    notes: 'Interested in a website for online orders and loyalty points.',
    lastUpdated: new Date().toISOString(),
    imageUrl: DEMO_IMAGES.bakery,
  },
  {
    id: '2',
    businessName: 'Elegance Fashion Store',
    contactPerson: 'David Omari',
    phoneNumber: '+254 722 987 654',
    email: 'david@elegancefashion.ke',
    socialMediaLink: 'facebook.com/elegancefashionke',
    leadSource: 'Facebook',
    businessType: 'Boutique',
    estimatedBudget: 3000,
    projectType: 'Inventory Management & E-commerce',
    status: 'Contacted',
    followUpDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    notes: 'Needs integration with local payment gateways like M-Pesa.',
    lastUpdated: new Date().toISOString(),
    imageUrl: DEMO_IMAGES.fashion,
  },
  {
    id: '3',
    businessName: 'Royal Glow Salon',
    contactPerson: 'Sarah Wanjiku',
    phoneNumber: '+254 733 111 222',
    email: 'sarah@royalglow.ke',
    socialMediaLink: 'instagram.com/royalglowsalon',
    leadSource: 'WhatsApp',
    businessType: 'Beauty Salon',
    estimatedBudget: 800,
    projectType: 'Booking Website',
    status: 'Proposal Sent',
    followUpDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    notes: 'Requires a booking system with calendar sync.',
    lastUpdated: new Date().toISOString(),
    imageUrl: DEMO_IMAGES.salon,
  },
  {
    id: '4',
    businessName: 'SafeDrive Car Hire',
    contactPerson: 'Michael Otieno',
    phoneNumber: '+254 744 555 666',
    email: 'info@safedrive.co.ke',
    socialMediaLink: 'safedrive.co.ke',
    leadSource: 'Website',
    businessType: 'Car Rental',
    estimatedBudget: 5000,
    projectType: 'Fleet Management System',
    status: 'Won',
    followUpDate: '',
    notes: 'Large project, requires GPS integration.',
    lastUpdated: new Date().toISOString(),
    imageUrl: DEMO_IMAGES.carHire,
  },
];

const mockNotes: LeadNote[] = [
  {
    id: 'n1',
    leadId: '1',
    text: 'Client requested a callback after 2 PM.',
    createdBy: 'Admin User',
    createdAt: new Date().toISOString(),
  },
];

const mockActivities: ActivityHistory[] = [
  {
    id: 'a1',
    leadId: '1',
    action: 'Created Lead',
    statusTo: 'New',
    changedBy: 'Admin User',
    timestamp: new Date().toISOString(),
  },
];

// Lead Store (State simulation)
let leads = [...mockLeads];
let notes = [...mockNotes];
let activities = [...mockActivities];

export const leadService = {
  getLeads: async (): Promise<Lead[]> => {
    return leads;
  },
  getLeadById: async (id: string): Promise<Lead | undefined> => {
    return leads.find(l => l.id === id);
  },
  createLead: async (lead: Omit<Lead, 'id' | 'lastUpdated'>): Promise<Lead> => {
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substring(2, 9),
      lastUpdated: new Date().toISOString(),
    };
    leads = [newLead, ...leads];
    
    // Log activity
    activities.push({
      id: Math.random().toString(36).substring(2, 9),
      leadId: newLead.id,
      action: 'Created Lead',
      statusTo: newLead.status,
      changedBy: 'Admin User',
      timestamp: new Date().toISOString(),
    });
    
    return newLead;
  },
  updateLead: async (id: string, updates: Partial<Lead>): Promise<Lead> => {
    const index = leads.findIndex(l => l.id === id);
    if (index === -1) throw new Error('Lead not found');
    
    const oldStatus = leads[index].status;
    const updatedLead = {
      ...leads[index],
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    leads[index] = updatedLead;

    if (updates.status && updates.status !== oldStatus) {
      activities.push({
        id: Math.random().toString(36).substring(2, 9),
        leadId: id,
        action: 'Status Changed',
        statusFrom: oldStatus,
        statusTo: updates.status,
        changedBy: 'Admin User',
        timestamp: new Date().toISOString(),
      });
    }

    return updatedLead;
  },
  deleteLead: async (id: string): Promise<void> => {
    leads = leads.filter(l => l.id !== id);
  },
  getLeadNotes: async (leadId: string): Promise<LeadNote[]> => {
    return notes.filter(n => n.leadId === leadId);
  },
  addNote: async (leadId: string, text: string): Promise<LeadNote> => {
    const newNote: LeadNote = {
      id: Math.random().toString(36).substring(2, 9),
      leadId,
      text,
      createdBy: 'Admin User',
      createdAt: new Date().toISOString(),
    };
    notes = [newNote, ...notes];
    return newNote;
  },
  getActivityHistory: async (leadId: string): Promise<ActivityHistory[]> => {
    return activities.filter(a => a.leadId === leadId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  },
  getReminders: async (): Promise<Reminder[]> => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    return leads
      .filter(l => l.followUpDate && l.status !== 'Won' && l.status !== 'Lost')
      .map(l => {
        let type: Reminder['type'] = 'Overdue';
        if (l.followUpDate === today) type = 'Today';
        else if (l.followUpDate === tomorrow) type = 'Tomorrow';
        else if (new Date(l.followUpDate) > new Date()) return null;

        return {
          id: Math.random().toString(36).substring(2, 9),
          leadId: l.id,
          businessName: l.businessName,
          reminderDate: l.followUpDate,
          type,
        } as Reminder;
      })
      .filter(Boolean) as Reminder[];
  }
};
export type LeadStatus = 'New' | 'Contacted' | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost';
export type LeadSource = 'Instagram' | 'Facebook' | 'WhatsApp' | 'Referral' | 'Website';

export interface LeadNote {
  id: string;
  leadId: string;
  text: string;
  createdBy: string;
  createdAt: string;
}

export interface ActivityHistory {
  id: string;
  leadId: string;
  action: string;
  statusFrom?: LeadStatus;
  statusTo?: LeadStatus;
  changedBy: string;
  timestamp: string;
}

export interface Lead {
  id: string;
  businessName: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  socialMediaLink: string;
  leadSource: LeadSource;
  businessType: string;
  estimatedBudget: number;
  projectType: string;
  status: LeadStatus;
  followUpDate: string;
  notes: string;
  lastUpdated: string;
  imageUrl?: string;
}

export interface Reminder {
  id: string;
  leadId: string;
  businessName: string;
  reminderDate: string;
  type: 'Overdue' | 'Today' | 'Tomorrow';
}
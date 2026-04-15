import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { leadService } from '@/services/leadService';
import { LeadSource, LeadStatus } from '@/types/lead';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ChevronLeft, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const AddLeadPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    phoneNumber: '',
    email: '',
    socialMediaLink: '',
    leadSource: 'Website' as LeadSource,
    businessType: '',
    estimatedBudget: '',
    projectType: '',
    status: 'New' as LeadStatus,
    followUpDate: '',
    notes: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic Validation
    if (!formData.businessName || !formData.contactPerson || !formData.email) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      await leadService.createLead({
        ...formData,
        estimatedBudget: Number(formData.estimatedBudget) || 0,
      });
      toast.success('Lead created successfully');
      navigate('/leads');
    } catch (error) {
      toast.error('Failed to create lead');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Add New Lead</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input 
                    id="businessName" 
                    value={formData.businessName} 
                    onChange={e => handleChange('businessName', e.target.value)}
                    placeholder="e.g. Nairobi Bakery"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPerson">Contact Person *</Label>
                  <Input 
                    id="contactPerson" 
                    value={formData.contactPerson} 
                    onChange={e => handleChange('contactPerson', e.target.value)}
                    placeholder="e.g. John Kamau"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input 
                      id="phoneNumber" 
                      value={formData.phoneNumber} 
                      onChange={e => handleChange('phoneNumber', e.target.value)}
                      placeholder="+254..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input 
                      id="email" 
                      type="email"
                      value={formData.email} 
                      onChange={e => handleChange('email', e.target.value)}
                      placeholder="client@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="socialMedia">Social Media / Website Link</Label>
                  <Input 
                    id="socialMedia" 
                    value={formData.socialMediaLink} 
                    onChange={e => handleChange('socialMediaLink', e.target.value)}
                    placeholder="instagram.com/business"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Lead Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Lead Source</Label>
                    <Select value={formData.leadSource} onValueChange={v => handleChange('leadSource', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                        <SelectItem value="Referral">Referral</SelectItem>
                        <SelectItem value="Website">Website</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Initial Status</Label>
                    <Select value={formData.status} onValueChange={v => handleChange('status', v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="New">New</SelectItem>
                        <SelectItem value="Contacted">Contacted</SelectItem>
                        <SelectItem value="Proposal Sent">Proposal Sent</SelectItem>
                        <SelectItem value="Negotiation">Negotiation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="followUp">Next Follow-up Date</Label>
                  <Input 
                    id="followUp" 
                    type="date"
                    value={formData.followUpDate} 
                    onChange={e => handleChange('followUpDate', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Project Scope</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input 
                    id="businessType" 
                    value={formData.businessType} 
                    onChange={e => handleChange('businessType', e.target.value)}
                    placeholder="e.g. Retail, Healthcare"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <Input 
                    id="projectType" 
                    value={formData.projectType} 
                    onChange={e => handleChange('projectType', e.target.value)}
                    placeholder="e.g. E-commerce Website"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Budget ($)</Label>
                  <Input 
                    id="budget" 
                    type="number"
                    value={formData.estimatedBudget} 
                    onChange={e => handleChange('estimatedBudget', e.target.value)}
                    placeholder="1500"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  id="notes" 
                  value={formData.notes} 
                  onChange={e => handleChange('notes', e.target.value)}
                  placeholder="Any extra information about the client's needs..."
                  className="min-h-[150px]"
                />
              </CardContent>
            </Card>

            <div className="flex gap-4 pt-4">
              <Button type="button" variant="outline" className="flex-1" onClick={() => navigate(-1)}>
                Cancel
              </Button>
              <Button type="submit" className="flex-1 gap-2">
                <Save className="w-4 h-4" /> Save Lead
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddLeadPage;
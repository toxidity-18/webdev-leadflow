import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { leadService } from '@/services/leadService';
import { Lead, LeadNote, ActivityHistory, LeadStatus } from '@/types/lead';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  ChevronLeft, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  DollarSign, 
  Clock, 
  FileText,
  MessageSquare,
  Send,
  User,
  ExternalLink,
  History
} from 'lucide-react';
import { toast } from 'sonner';

const LeadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [notes, setNotes] = useState<LeadNote[]>([]);
  const [activities, setActivities] = useState<ActivityHistory[]>([]);
  const [newNote, setNewNote] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchLeadDetails(id);
    }
  }, [id]);

  const fetchLeadDetails = async (leadId: string) => {
    try {
      const [leadData, notesData, activityData] = await Promise.all([
        leadService.getLeadById(leadId),
        leadService.getLeadNotes(leadId),
        leadService.getActivityHistory(leadId)
      ]);
      
      if (leadData) {
        setLead(leadData);
        setNotes(notesData);
        setActivities(activityData);
      } else {
        toast.error('Lead not found');
        navigate('/leads');
      }
    } catch (error) {
      toast.error('Error loading lead details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() || !id) return;
    try {
      await leadService.addNote(id, newNote);
      setNewNote('');
      fetchLeadDetails(id);
      toast.success('Note added');
    } catch (error) {
      toast.error('Failed to add note');
    }
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New': return <Badge className="bg-slate-500">New</Badge>;
      case 'Contacted': return <Badge className="bg-orange-500">Contacted</Badge>;
      case 'Proposal Sent': return <Badge className="bg-purple-500">Proposal Sent</Badge>;
      case 'Negotiation': return <Badge className="bg-blue-500">Negotiation</Badge>;
      case 'Won': return <Badge className="bg-emerald-500">Won</Badge>;
      case 'Lost': return <Badge className="bg-red-500">Lost</Badge>;
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-[60vh]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;
  if (!lead) return null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4">
        <Link to="/leads">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{lead.businessName}</h2>
          <div className="flex items-center gap-2 mt-1">
            {getStatusBadge(lead.status)}
            <span className="text-muted-foreground text-sm flex items-center gap-1">
              <Clock className="w-3 h-3" /> Last updated {new Date(lead.lastUpdated).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <Card className="border-none shadow-sm overflow-hidden">
            {lead.imageUrl && (
              <div className="h-48 w-full overflow-hidden">
                <img src={lead.imageUrl} alt={lead.businessName} className="w-full h-full object-cover" />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-xl font-bold">Business Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Contact Person</p>
                      <p className="font-semibold">{lead.contactPerson}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Phone Number</p>
                      <p className="font-semibold">{lead.phoneNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email Address</p>
                      <p className="font-semibold">{lead.email}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Social/Website</p>
                      <p className="font-semibold flex items-center gap-1">
                        {lead.socialMediaLink} <ExternalLink className="w-3 h-3" />
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Estimated Budget</p>
                      <p className="font-semibold">${lead.estimatedBudget.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Next Follow Up</p>
                      <p className="font-semibold">{lead.followUpDate || 'Not scheduled'}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <p className="text-xs text-muted-foreground mb-2">Internal Notes</p>
                <div className="bg-muted/50 p-4 rounded-lg text-sm italic">
                  "{lead.notes || 'No initial notes provided.'}"
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity History */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Action History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activities.map((activity, idx) => (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-primary mt-1.5" />
                      {idx !== activities.length - 1 && <div className="w-0.5 flex-1 bg-muted my-1" />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.statusFrom && activity.statusTo ? (
                          <>From {activity.statusFrom} to {activity.statusTo}</>
                        ) : activity.action}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {new Date(activity.timestamp).toLocaleString()} by {activity.changedBy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Notes Section */}
          <Card className="border-none shadow-sm h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-orange-500" />
                Notes Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="flex-1 space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {notes.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8 italic">No notes yet.</p>
                ) : (
                  notes.map((note) => (
                    <div key={note.id} className="bg-muted/30 p-3 rounded-xl space-y-2">
                      <p className="text-sm">{note.text}</p>
                      <div className="flex justify-between items-center pt-1 border-t border-muted">
                        <span className="text-[10px] font-bold text-primary">{note.createdBy}</span>
                        <span className="text-[10px] text-muted-foreground">{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="pt-4 border-t space-y-3">
                <Textarea 
                  placeholder="Type a new note..." 
                  className="min-h-[100px] resize-none"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <Button className="w-full gap-2" onClick={handleAddNote}>
                  <Send className="w-4 h-4" /> Add Note
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;
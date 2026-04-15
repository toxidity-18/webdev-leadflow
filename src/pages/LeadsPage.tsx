import React, { useEffect, useState } from 'react';
import { leadService } from '@/services/leadService';
import { Lead, LeadStatus, LeadSource } from '@/types/lead';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MoreHorizontal, 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Filter,
  ArrowUpDown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LeadsPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeads();
  }, []);

  useEffect(() => {
    const results = leads.filter(l => 
      l.businessName.toLowerCase().includes(search.toLowerCase()) ||
      l.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredLeads(results);
  }, [search, leads]);

  const fetchLeads = async () => {
    try {
      const data = await leadService.getLeads();
      setLeads(data);
    } catch (error) {
      toast.error('Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New': return <Badge className="bg-slate-500 hover:bg-slate-600">New</Badge>;
      case 'Contacted': return <Badge className="bg-orange-500 hover:bg-orange-600">Contacted</Badge>;
      case 'Proposal Sent': return <Badge className="bg-purple-500 hover:bg-purple-600">Proposal</Badge>;
      case 'Negotiation': return <Badge className="bg-blue-500 hover:bg-blue-600">Negotiation</Badge>;
      case 'Won': return <Badge className="bg-emerald-500 hover:bg-emerald-600">Won</Badge>;
      case 'Lost': return <Badge className="bg-red-500 hover:bg-red-600">Lost</Badge>;
    }
  };

  const updateStatus = async (id: string, status: LeadStatus) => {
    try {
      await leadService.updateLead(id, { status });
      toast.success(`Status updated to ${status}`);
      fetchLeads();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteLead = async (id: string) => {
    if (confirm('Are you sure you want to delete this lead?')) {
      try {
        await leadService.deleteLead(id);
        toast.success('Lead deleted successfully');
        fetchLeads();
      } catch (error) {
        toast.error('Failed to delete lead');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Leads Management</h2>
          <p className="text-muted-foreground">View and manage your business opportunities.</p>
        </div>
        <Link to="/add-lead">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> Add New Lead
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative w-full md:max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by name, contact, or email..." 
            className="pl-10" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 shrink-0">
          <Filter className="w-4 h-4" /> Filters
        </Button>
      </div>

      <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-bold">Business Name</TableHead>
              <TableHead className="font-bold">Contact Person</TableHead>
              <TableHead className="font-bold">Source</TableHead>
              <TableHead className="font-bold">Budget</TableHead>
              <TableHead className="font-bold">Status</TableHead>
              <TableHead className="font-bold">Follow Up</TableHead>
              <TableHead className="text-right font-bold">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  <div className="flex justify-center"><div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" /></div>
                </TableCell>
              </TableRow>
            ) : filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No leads found.
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{lead.businessName}</span>
                      <span className="text-[10px] text-muted-foreground font-normal">{lead.projectType}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>{lead.contactPerson}</span>
                      <span className="text-xs text-muted-foreground">{lead.phoneNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="font-normal">{lead.leadSource}</Badge>
                  </TableCell>
                  <TableCell className="font-semibold text-sm">
                    ${lead.estimatedBudget.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(lead.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-xs">
                      <span>{lead.followUpDate || 'N/A'}</span>
                      {lead.followUpDate && new Date(lead.followUpDate) < new Date() && lead.status !== 'Won' && (
                        <span className="text-destructive font-bold">Overdue</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48">
                        <DropdownMenuItem onClick={() => navigate(`/leads/${lead.id}`)}>
                          <Eye className="mr-2 w-4 h-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/leads/${lead.id}/edit`)}>
                          <Edit className="mr-2 w-4 h-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-emerald-600" onClick={() => updateStatus(lead.id, 'Won')}>
                          <Badge className="bg-emerald-500 mr-2 w-3 h-3 p-0 rounded-full" /> Mark as Won
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => updateStatus(lead.id, 'Lost')}>
                          <Badge className="bg-red-500 mr-2 w-3 h-3 p-0 rounded-full" /> Mark as Lost
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => deleteLead(lead.id)}>
                          <Trash2 className="mr-2 w-4 h-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeadsPage;
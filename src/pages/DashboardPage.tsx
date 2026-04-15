import React, { useEffect, useState } from 'react';
import { leadService } from '@/services/leadService';
import { Lead, ActivityHistory, Reminder } from '@/types/lead';
import StatsCards from '@/components/dashboard/StatsCards';
import ConversionChart from '@/components/dashboard/ConversionChart';
import RemindersList from '@/components/dashboard/RemindersList';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { History, TrendingUp } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [activities, setActivities] = useState<ActivityHistory[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [leadsData, remindersData] = await Promise.all([
          leadService.getLeads(),
          leadService.getReminders()
        ]);
        setLeads(leadsData);
        setReminders(remindersData);
        
        // Fetch last 10 activities
        const allActivities = await Promise.all(
          leadsData.map(l => leadService.getActivityHistory(l.id))
        );
        const flattened = allActivities.flat().sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        ).slice(0, 10);
        
        setActivities(flattened);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your leads.</p>
        </div>
      </div>

      <StatsCards leads={leads} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ConversionChart leads={leads} />
          
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <History className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activities.map((activity) => {
                  const lead = leads.find(l => l.id === activity.leadId);
                  return (
                    <div key={activity.id} className="flex gap-4">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center relative z-10">
                          <TrendingUp className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="absolute top-8 bottom-[-24px] left-1/2 -translate-x-1/2 w-0.5 bg-muted last:hidden" />
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold">
                            {activity.action} - <span className="text-primary">{lead?.businessName}</span>
                          </h4>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                            {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {activity.statusFrom ? (
                            <>Changed status from <Badge variant="outline" className="text-[10px] py-0">{activity.statusFrom}</Badge> to <Badge variant="secondary" className="text-[10px] py-0">{activity.statusTo}</Badge></>
                          ) : (
                            `New lead added to the pipeline by ${activity.changedBy}`
                          )}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <RemindersList reminders={reminders} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
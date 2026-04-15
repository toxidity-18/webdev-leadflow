import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Bell, Clock, ChevronRight } from 'lucide-react';
import { Reminder } from '@/types/lead';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface RemindersListProps {
  reminders: Reminder[];
}

const RemindersList: React.FC<RemindersListProps> = ({ reminders }) => {
  const getBadgeVariant = (type: Reminder['type']) => {
    switch (type) {
      case 'Overdue': return 'destructive';
      case 'Today': return 'secondary';
      case 'Tomorrow': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card className="border-none shadow-sm h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <Bell className="w-5 h-5 text-orange-500" />
          Reminders
        </CardTitle>
        <Badge variant="secondary" className="rounded-full">
          {reminders.length} Active
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {reminders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Clock className="w-12 h-12 text-muted-foreground/20 mb-2" />
            <p className="text-sm text-muted-foreground font-medium">No pending follow-ups</p>
          </div>
        ) : (
          reminders.map((reminder) => (
            <div 
              key={reminder.id} 
              className="flex items-center justify-between p-3 rounded-lg border bg-card hover:border-primary/50 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${
                  reminder.type === 'Overdue' ? 'bg-destructive/10 text-destructive' : 
                  reminder.type === 'Today' ? 'bg-orange-500/10 text-orange-500' : 
                  'bg-blue-500/10 text-blue-500'
                }`}>
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">{reminder.businessName}</h4>
                  <p className="text-xs text-muted-foreground">{reminder.reminderDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant={getBadgeVariant(reminder.type)} className="text-[10px]">
                  {reminder.type}
                </Badge>
                <Link to={`/leads/${reminder.leadId}`}>
                  <Button size="icon" variant="ghost" className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default RemindersList;
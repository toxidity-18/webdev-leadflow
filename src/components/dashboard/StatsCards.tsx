import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Users, 
  PhoneCall, 
  Send, 
  Trophy, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Lead } from '@/types/lead';

interface StatsCardsProps {
  leads: Lead[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ leads }) => {
  const total = leads.length;
  const contacted = leads.filter(l => l.status === 'Contacted').length;
  const proposalSent = leads.filter(l => l.status === 'Proposal Sent').length;
  const won = leads.filter(l => l.status === 'Won').length;
  const lost = leads.filter(l => l.status === 'Lost').length;
  
  const conversionRate = total > 0 ? Math.round((won / total) * 100) : 0;

  const stats = [
    {
      title: 'Total Leads',
      value: total,
      icon: Users,
      trend: '+12%',
      trendUp: true,
      color: 'blue'
    },
    {
      title: 'Contacted',
      value: contacted,
      icon: PhoneCall,
      trend: '+5%',
      trendUp: true,
      color: 'orange'
    },
    {
      title: 'Proposals',
      value: proposalSent,
      icon: Send,
      trend: '-2%',
      trendUp: false,
      color: 'purple'
    },
    {
      title: 'Won Deals',
      value: won,
      icon: Trophy,
      trend: '+8%',
      trendUp: true,
      color: 'emerald'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-none shadow-sm bg-card/50 backdrop-blur-sm overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-${stat.color}-500/10`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.trendUp ? 'text-emerald-500' : 'text-destructive'}`}>
                {stat.trend}
                {stat.trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">{stat.title}</p>
              <h3 className="text-3xl font-bold mt-1 tracking-tight">{stat.value}</h3>
            </div>
          </CardContent>
        </Card>
      ))}
      
      <Card className="md:col-span-2 lg:col-span-1 border-none shadow-sm bg-primary text-primary-foreground overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="relative z-10">
            <p className="text-primary-foreground/80 text-sm font-medium">Conversion Rate</p>
            <h3 className="text-4xl font-bold mt-2">{conversionRate}%</h3>
            <div className="mt-4 flex items-center gap-2">
              <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-1000" 
                  style={{ width: `${conversionRate}%` }} 
                />
              </div>
            </div>
            <p className="text-xs mt-4 text-primary-foreground/70">
              Increase of 4% from last month
            </p>
          </div>
          <TrendingUp className="absolute -bottom-4 -right-4 w-32 h-32 text-white/5 rotate-12" />
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
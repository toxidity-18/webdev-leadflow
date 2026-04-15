import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Lead } from '@/types/lead';

interface ConversionChartProps {
  leads: Lead[];
}

const ConversionChart: React.FC<ConversionChartProps> = ({ leads }) => {
  const data = [
    { name: 'New', count: leads.filter(l => l.status === 'New').length, color: '#94a3b8' },
    { name: 'Contacted', count: leads.filter(l => l.status === 'Contacted').length, color: '#f97316' },
    { name: 'Proposal', count: leads.filter(l => l.status === 'Proposal Sent').length, color: '#8b5cf6' },
    { name: 'Negotiation', count: leads.filter(l => l.status === 'Negotiation').length, color: '#0ea5e9' },
    { name: 'Won', count: leads.filter(l => l.status === 'Won').length, color: '#10b981' },
    { name: 'Lost', count: leads.filter(l => l.status === 'Lost').length, color: '#ef4444' },
  ];

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-bold">Lead Pipeline Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ConversionChart;
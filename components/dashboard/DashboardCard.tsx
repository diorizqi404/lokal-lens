'use client';

import { motion } from 'framer-motion';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'green' | 'blue' | 'purple' | 'red' | 'yellow';
}

const colorClasses = {
  green: 'bg-green-50 text-green-600',
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  red: 'bg-red-50 text-red-600',
  yellow: 'bg-yellow-50 text-yellow-600',
};

export default function DashboardCard({ 
  title, 
  value, 
  icon, 
  trend,
  color = 'green' 
}: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
      className="bg-white rounded-2xl h-full p-6 shadow-sm border border-gray-100 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-[#1A1A1A] mb-3">{value}</p>
          {trend && (
            <div className="flex items-center gap-1">
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className={`${trend.isPositive ? 'rotate-0' : 'rotate-180'}`}
              >
                <path 
                  d="M8 3L13 8L11.59 9.41L9 6.83V13H7V6.83L4.41 9.41L3 8L8 3Z" 
                  fill={trend.isPositive ? '#10B981' : '#EF4444'}
                />
              </svg>
              <span className={`text-sm font-semibold ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(trend.value)}%
              </span>
              <span className="text-sm text-gray-500">dari bulan lalu</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

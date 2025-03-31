"use client";

import { useToast } from '@/components/feedback';
import { useEffect } from 'react';
import styles from './TrendingTable.module.css';

interface TrendingTableProps {
  data?: any[];
  isLoading?: boolean;
  error?: Error;
}

export default function TrendingTable({ data = [], isLoading = false, error }: TrendingTableProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast.custom({
        title: "Failed to Load Trending Data",
        description: error.message || "An error occurred while loading trending data. Please try again later.",
        variant: "error"
      });
    }
  }, [error, toast]);

  useEffect(() => {
    if (!isLoading && data.length === 0) {
      toast.custom({
        title: "No Trending Data",
        description: "No trending collections are available at the moment. Check back later for updates.",
        variant: "info"
      });
    }
  }, [isLoading, data.length, toast]);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className="p-4 space-y-4">
          <div className={`h-8 w-1/4 rounded ${styles.shimmer}`}></div>
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className={`h-12 rounded ${styles.shimmer}`}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={styles.container}>
        <div className="p-6 text-center">
          <p className="text-cosmic-grey-400 text-lg">No trending data available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            <th className={styles.headerCell}>#</th>
            <th className={styles.headerCell}>Collection</th>
            <th className={styles.headerCell}>Floor Price</th>
            <th className={styles.headerCell}>Volume (24h)</th>
            <th className={styles.headerCell}>Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className={styles.row}>
              <td className={`${styles.cell} ${styles.indexCell}`}>{index + 1}</td>
              <td className={styles.cell}>{item.name || 'Unknown Collection'}</td>
              <td className={styles.cell}>{item.floorPrice || '—'} METIS</td>
              <td className={styles.cell}>{item.volume || '—'} METIS</td>
              <td className={`${styles.cell} ${item.change > 0 ? styles.positive : item.change < 0 ? styles.negative : ''}`}>
                {item.change > 0 ? '+' : ''}{item.change || '0'}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 
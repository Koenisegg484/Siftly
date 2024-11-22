// src/types/global.d.ts

// BannerItem Type
export interface BannerItem {
    title: string;
    description: string;
    secondary?: string; // Optional 'secondary' property
  }
  
  // Offer Type
  export interface Offer {
    key: number;
    title: string;
    description: string;
    price: string;
    startDate: string;
    endDate: string;
    creditCardIcon: string;
    ecommerceIcon: string;
    backgroundImage: string; // Required 'backgroundImage' property
  }
  
  // Chart Configuration Types
  export type ChartOptions = {
    responsive: boolean;
    plugins: {
      legend: {
        position: string;
        onClick: (e: any, legendItem: any, legend: any) => void;
      };
      title: {
        display: boolean;
        text: string;
      };
      tooltip: {
        callbacks: {
          label: (context: any) => string;
        };
      };
    };
    interaction: {
      mode: string;
    };
    scales: {
      [key: string]: any;
    };
  };
  
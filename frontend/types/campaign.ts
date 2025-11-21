export interface Campaign {
  id: number;
  name: string;
  status: 'Active' | 'Paused';
  clicks: number;
  cost: number;
  impressions: number;
}

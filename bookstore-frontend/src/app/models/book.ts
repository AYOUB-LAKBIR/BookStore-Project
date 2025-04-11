export interface Book {
  id?: number; // Optionnel car généré par le backend
  title: string;
  author: string;
  price: number;
  description?: string; // Optionnel
}

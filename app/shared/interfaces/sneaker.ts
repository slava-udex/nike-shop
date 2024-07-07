export interface ISneaker {
  id: string;
  collectionId: string;
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  showcase: string[];
  category: string;
  colors: string[];
  sizes: string[];
  price: number;
  sizesAvalaible: string[];
}

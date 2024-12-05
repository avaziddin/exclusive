type Translation = {
    ru: string;
    en: string;
  };
  
  type Translation_descr = {
    ru: string;
    en: string;
  };
  
  export type Product = {
    _id: string;
    titles: Translation;
    description: Translation_descr;
    price: number;
    discound: number;
    images: string[];
    colors: [];
    category: string;
    type: string;
    rating: number;
  };
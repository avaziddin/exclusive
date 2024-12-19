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
    image: string[];
    colors: [];
    size: [];
    category: string;
    type: string;
    rating: number;
  };
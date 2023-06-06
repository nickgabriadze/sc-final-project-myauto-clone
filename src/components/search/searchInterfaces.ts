export interface Manufacturer {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
}

export interface Category {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
}

export interface Model {
  cat_man_id: number;
  cat_model_id: number;
  cat_modif_id: number;
  is_car: boolean;
  is_moto: boolean;
  is_spec: boolean;
  man_id: number;
  model_group: string;
  model_id: number;
  model_name: string;
  show_in_salons: number;
  shown_in_slider: number;
  sort_order: number;
}

export interface SortedManModel {
  man_name: string;
  man_id: number,
  models_group: {[key:string]: Model[]}[];
}

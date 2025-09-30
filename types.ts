export interface City {
  id: number;
  name: string;
  name_ar: string;
}

export interface Wilaya {
  id: number;
  code: string;
  name: string;
  name_ar: string;
  deliveryPriceHome: number | null | string;
  deliveryPriceStopDesk: number | null | string;
  cities: City[];
}

export enum DeliveryType {
  Home = 'home',
  StopDesk = 'stopdesk',
}

export interface OrderDetails {
    firstName: string;
    lastName: string;
    phone: string;
    phoneModel: string;
    wilaya: string;
    baladiya: string;
    deliveryType: string;
    deliveryPrice: number | string;
    totalPrice: number;
}
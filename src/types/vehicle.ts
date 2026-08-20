import { ElementType } from "react";

export interface VehicleType {
  name: string;
  brand: string;
  model: string;
  vehicleModelDate?: string;
  vehicleIdentificationNumber?: string;
  mileageFromOdometer?: number;
  mileageUnit?: string;
  fuelType?: string;
  vehicleTransmission?: string;
  price: string;
  currency: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  url: string;
  image?: string;
  sellerName?: string;
}

export interface RichVehicleProps {
  vehicle: VehicleType;
  ScriptWrap?: ElementType;
}

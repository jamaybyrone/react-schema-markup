import { Vehicle, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichVehicleProps } from "@/types/vehicle";
import JsonLd from "./JsonLd";

const RichVehicle: FC<RichVehicleProps> = ({ vehicle, ScriptWrap }) => {
  const {
    name,
    brand,
    model,
    vehicleModelDate,
    vehicleIdentificationNumber,
    mileageFromOdometer,
    mileageUnit = "SMI",
    fuelType,
    vehicleTransmission,
    price,
    currency = "USD",
    availability = "InStock",
    url,
    image,
    sellerName,
  } = vehicle;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name,
    url,
    image,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    model,
    vehicleModelDate,
    vehicleIdentificationNumber,
    fuelType,
    vehicleTransmission,
    mileageFromOdometer: mileageFromOdometer && {
      "@type": "QuantitativeValue",
      value: mileageFromOdometer,
      unitCode: mileageUnit,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: currency,
      price,
      availability: `https://schema.org/${availability}`,
      seller: sellerName && {
        "@type": "Organization",
        name: sellerName,
      },
    },
  } as WithContext<Vehicle>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichVehicle;

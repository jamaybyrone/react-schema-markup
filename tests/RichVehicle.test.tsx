import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichVehicle from "../src/RichVehicle";
import { RichVehicleProps } from "../src/types/vehicle";

interface TestCase {
  scenario: string;
  props: RichVehicleProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a vehicle listing",
    props: {
      vehicle: {
        name: "2023 Sopapilla Wagon",
        brand: "CasaMotors",
        model: "Sopapilla Wagon",
        vehicleModelDate: "2023",
        mileageFromOdometer: 15000,
        fuelType: "Gasoline",
        vehicleTransmission: "Automatic",
        price: "18999.00",
        currency: "USD",
        url: "https://casabonita.com/vehicles/sopapilla-wagon",
        sellerName: "Casa Bonita Motors",
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Vehicle",
      name: "2023 Sopapilla Wagon",
      url: "https://casabonita.com/vehicles/sopapilla-wagon",
      brand: {
        "@type": "Brand",
        name: "CasaMotors",
      },
      model: "Sopapilla Wagon",
      vehicleModelDate: "2023",
      fuelType: "Gasoline",
      vehicleTransmission: "Automatic",
      mileageFromOdometer: {
        "@type": "QuantitativeValue",
        value: 15000,
        unitCode: "SMI",
      },
      offers: {
        "@type": "Offer",
        url: "https://casabonita.com/vehicles/sopapilla-wagon",
        priceCurrency: "USD",
        price: "18999.00",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Casa Bonita Motors",
        },
      },
    },
  },
];

const setup = (props: RichVehicleProps) => {
  return render(<RichVehicle {...props} />);
};

describe("RichVehicle", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});

import React from "react";
import { FaLocationDot } from "react-icons/fa6";

interface LocationMapProps {
  city: string;
  country: string;
}

const LocationMap: React.FC<LocationMapProps> = ({ city, country }) => {
  const googleMapsEmbedUrl = `https://www.openstreetmap.org/search?query=${encodeURIComponent(
    `${city}, ${country}`
  )}`;

  return (
    <div>
      <a
        href={googleMapsEmbedUrl}
        className="flex items-center gap-1"
        target="_blank"
      >
        <FaLocationDot color="green" />
        <span className="text-[#4d4c4c]">
          {city}, {country}
        </span>
      </a>
    </div>
  );
};

export default LocationMap;

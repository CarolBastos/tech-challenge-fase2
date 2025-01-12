import Image from "next/image";
import React from "react";

interface WelcomeCard {
  cardImage?: string | undefined;
  cardAltImage: string;
  cardTitle?: string | undefined;
  cardText?: string | undefined;
}

const WelcomeCard: React.FC<WelcomeCard> = ({
  cardImage,
  cardAltImage = "",
  cardTitle,
  cardText,
}) => {
  return (
    <div className="flex flex-col gap-4 items-center font-inter">
      {cardImage && (
        <Image src={cardImage} alt={cardAltImage} width={73} height={56} />
      )}
      <h3 className="text-black text-center font-semibold text-tertiary-500 text-lg">
        {cardTitle}
      </h3>
      <p className="text-center text-sm">{cardText}</p>
    </div>
  );
};

export default WelcomeCard;

import React from "react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";

interface OffCardProps {
  subTitle: string;
  title: string;
  image: string;
}

const OffCard: React.FC<OffCardProps> = ({ subTitle, title, image }) => {
  return (
    <div className="w-full mx-auto bg-secondary">
      <Card className="border-0 shadow-lg overflow-hidden p-0">
        <CardContent className="p-0">
          <div
            className="w-full h-64 sm:h-72 md:h-80 lg:h-89 rounded-[12px] bg-no-repeat bg-right bg-cover flex items-center px-4 sm:px-6 md:px-7 relative"
            style={{
              backgroundImage: `url(${image})`,
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent rounded-[12px]"></div>
            
            <div className="relative z-10 text-white max-w-xs sm:max-w-sm">
              <h3 className="text-sm sm:text-base md:text-[18px] font-extrabold mb-3 sm:mb-4 md:mb-6 text-white/90">
                {subTitle}
              </h3>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[36px] font-extrabold mb-2 leading-tight">
                {title}
              </h1>
              <h6 className="text-sm sm:text-base font-medium mb-6 sm:mb-8 md:mb-10 text-white/80">
                UPTO 50% OFF
              </h6>
              <Button 
                variant="ghost" 
                className="text-base sm:text-lg md:text-xl font-extrabold underline underline-offset-2 hover:text-white/80 transition-colors duration-300 p-0 h-auto text-white hover:bg-transparent"
              >
                Explore Items
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OffCard;
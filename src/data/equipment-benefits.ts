// קודי הנחה לציוד ריצה לחברי ENDURO (עמוד /races/). הסדר: הריבועים הראשיים, ואחריהם ריבוע "קודי הנחה נוספים".
// הקודים והאחוזים לפי הגרפיקה שתומר שלח ב-9.10.2026. פרטי Garmin לפי הודעת השיתוף פעולה של Garmin Israel.

export interface EquipmentBenefit {
  brand: string;
  hebrew?: string;
  discount: string; // למשל "25% הנחה"
  code: string;
  note?: string;
  details?: string[]; // שורות הסבר נוספות, למשל איך מממשים
}

export const mainBenefits: EquipmentBenefit[] = [
  { brand: "Salomon", hebrew: "סלומון", discount: "25% הנחה", code: "Eitan25" },
  {
    brand: "Garmin",
    hebrew: "גרמין",
    discount: "10% הנחה",
    code: "9752",
    note: "קוד המאמן",
    details: [
      "בסניפים: חובה לומר את קוד המאמן 9752 בקופה לפני הרכישה.",
      "באתר: קופון ייחודי trainer-9752, חובה להקליד עם המקף. 10% הנחה.",
      "בסניפי אילת (ללא מע״מ): עם הצגת קוד המאמן בקופה, הנחה נוספת של עד 6% לפי המוצר, בנוסף להורדת המע״מ.",
    ],
  },
  { brand: "PRORUNNER", hebrew: "פרוראנר", discount: "הנחה מיוחדת", code: "ENDURO" },
  { brand: "HOKA", hebrew: "הוקה", discount: "25% הנחה", code: "TomerA" },
];

export const moreBenefits: EquipmentBenefit[] = [
  { brand: "COROS", discount: "15% הנחה", code: "ENDURO" },
  { brand: "INCYLENCE", discount: "10% הנחה", code: "Tomer" },
  { brand: "Panta Rei", discount: "25% הנחה", code: "PANTEAM" },
];

export type Language = 'ar' | 'en';

export interface ServiceItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  featuresAr: string[];
  featuresEn: string[];
  startingPrice: number;
  unitAr: string;
  unitEn: string;
  image: string;
  popular?: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  districtAr: string;
  districtEn: string;
  rating: number;
  dateAr: string;
  dateEn: string;
  serviceAr: string;
  serviceEn: string;
  commentAr: string;
  commentEn: string;
}

export interface DistrictItem {
  nameAr: string;
  nameEn: string;
  zoneAr: string;
  zoneEn: string;
  deliveryTime: string;
}

export interface FaqItem {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
}

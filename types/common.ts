export interface LocaleProps {
  code: string;
  name: string;
  direction: "ltr" | "rtl";
  icon: string;
}

export type MediaStep = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

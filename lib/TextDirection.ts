export const RTL_LANGAUGES = ["ar", "fa", "ku"];

export type RTLLanguage = (typeof RTL_LANGAUGES)[number];

export const isRTL = (locale: string): boolean =>
  RTL_LANGAUGES.includes(locale as RTLLanguage);

export const getTextDirection = (locale: string): "rtl" | "ltr" =>
  isRTL(locale) ? "rtl" : "ltr";

export const getDirectionClass = (locale: string): string =>
  isRTL(locale) ? "rtl" : "ltr";

export const getFontFamily = (locale: string) => {
  switch (locale) {
    case "ar":
      return "'Arial Unicode MS', 'Segoe UI', 'Tahoma', sans-serif";
    case "fa":
      return "'Iranian Sans', 'Segoe UI', 'Tahoma', sans-serif";
    case "ku":
      return "'Arial Unicode MS', 'Segoe UI', 'Tahoma', sans-serif";
    default:
      return "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
  }
};

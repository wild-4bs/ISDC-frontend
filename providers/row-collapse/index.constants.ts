import { MediaStep } from "@/types/common";

export const breakpointClasses: Record<MediaStep, string> = {
  xs: "max-xs:hidden",
  sm: "max-sm:hidden",
  md: "max-md:hidden",
  lg: "max-lg:hidden",
  xl: "max-xl:hidden",
  "2xl": "max-2xl:hidden",
};

export const minBreakpointClasses: Record<MediaStep, string> = {
  xs: "xs:hidden",
  sm: "sm:hidden",
  md: "md:hidden",
  lg: "lg:hidden",
  xl: "xl:hidden",
  "2xl": "2xl:hidden",
};

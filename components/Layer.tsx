import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const layerVariants = cva(
  "absolute top-0 left-0 w-full h-full pointer-events-none z-0 opacity-[21%]",
  {
    variants: {
      variant: {
        primary: "bg-primary",
        dark: "bg-black",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

export const Layer = ({
  className,
  variant,
  style,
}: VariantProps<typeof layerVariants> & React.ComponentProps<"div">) => {
  return (
    <div
      className={cn(layerVariants({ variant, className }))}
      style={style}
    ></div>
  );
};

import Rectangle1 from "@/assets/shapes/rectangle-1.svg";
import Rectangle2 from "@/assets/shapes/rectangle-2.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Key, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export default function page() {
  const trans = useTranslations("login");
  return (
    <main
      className="w-screen h-[calc(100vh-150px)] relative flex items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(45deg, #6B78FB, #BFDAF5)" }}
    >
      <div className="w-full max-w-sm h-fit relative">
        <Rectangle1 className="absolute -top-12 start-0 z-0" />
        <Rectangle2 className="absolute -bottom-48 end-48 z-0" />
        <div className="content w-full bg-white rounded-xl h-full z-10 relative px-5 py-8">
          <h1 className="font-bold text-lg mb-10 text-center">
            {trans("title")}
          </h1>
          <div className="grid gap-2 mb-4">
            <Label>{trans("email")}</Label>
            <Input
              placeholder={trans("enterYourEmail")}
              icon={<Mail />}
              size={"sm"}
            />
          </div>
          <div className="grid gap-2">
            <Label>{trans("password")}</Label>
            <Input
              placeholder={trans("enterThePassword")}
              icon={<Key />}
              size={"sm"}
            />
          </div>
          <Button className="w-full mt-4">{trans("login")}</Button>
        </div>
      </div>
    </main>
  );
}

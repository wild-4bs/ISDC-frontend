"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "@/i18n/routing";
import { supportedLanguages } from "@/i18n/supportedLanguages";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useTransition } from "react";

export const LangSelector = () => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const selectLang = (locale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale });
    });
  };

  return (
    <>
      <Select onValueChange={selectLang} defaultValue={locale}>
        <SelectTrigger className="capitalize" disabled={isPending}>
          <SelectValue placeholder={"Select language"}></SelectValue>
          <SelectContent>
            {supportedLanguages.map((lang) => (
              <SelectItem key={lang.code} value={lang.code}>
                <span className="flex items-center justify-between gap-4">
                  <Image
                    src={`https://flagcdn.com/w40/${lang.flag}.png`}
                    alt={lang.label}
                    className="w-4 h-4 rounded-sm object-cover"
                    width={16}
                    height={16}
                  />
                  <span className="capitalize">{lang.label}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </SelectTrigger>
      </Select>
    </>
  );
};

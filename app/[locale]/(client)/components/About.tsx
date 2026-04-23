import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const About = () => {
  const aboutTrans = useTranslations("home.about");
  return (
    <section>
      <Container className="flex gap-6 max-md:flex-col md:justify-between">
        <div className="flex flex-col pb-10 max-w-3xl">
          <h2 className="font-medium text-3xl max-sm:text-xl">
            {aboutTrans("title")}
          </h2>
          <h2 className="font-semibold text-5xl max-sm:text-3xl my-4 max-sm:my-3">
            {aboutTrans("subtitle")}
          </h2>
          <p className="font-normal text-xl max-sm:text-lg flex-1 mb-4">
            {aboutTrans("caption")}
          </p>
          <Link href={"/#services"}>
            <Button
              className="w-fit text-lg max-sm:text-base bg-linear-to-r from-[#42b7e9] to-[#9F65BC] px-5"
              style={{ borderTopLeftRadius: "30px" }}
            >
              {aboutTrans("ctaButton")}
            </Button>
          </Link>
        </div>
        <Image
          src={"/home/about.png"}
          alt="about"
          width={1000}
          height={1000}
          className="min-w-sm w-sm max-lg:hidden h-full object-cover rounded-3xl"
        />
      </Container>
    </section>
  );
};

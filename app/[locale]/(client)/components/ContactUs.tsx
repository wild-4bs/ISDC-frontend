import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

export const ContactUs = () => {
  const contactTrans = useTranslations("home.contact");
  return (
    <section className="my-20">
      <Container>
        <header className="text-center mb-10">
          <h2 className="font-bold text-3xl mb-1">{contactTrans("title")}</h2>
          <p className="font-normal text-xl">{contactTrans("caption")}</p>
        </header>
        <div className="flex gap-12 max-lg:flex-col">
          <div className="form w-full flex-1 [&_label]:font-semibold">
            <div className="grid gap-2 w-full mb-5">
              <Label>{contactTrans("inputs.email.label")}</Label>
              <Input
                placeholder={contactTrans("inputs.email.placeholder")}
                type="email"
                className="rounded-full"
              />
            </div>
            <div className="grid gap-2 w-full">
              <Label>{contactTrans("inputs.message.label")}</Label>
              <textarea
                placeholder={contactTrans("inputs.message.placeholder")}
                className="border border-input rounded-xl shadow-xs outline-none p-4 min-h-[200px] max-h-[250px] resize-y"
              />
            </div>
            <Button className="w-[100px] mt-4">{contactTrans("inputs.send")}</Button>
          </div>
          <div className="lg:flex-1 w-full min-h-[300px] h-[300px] rounded-xl overflow-hidden border border-input max-lg:w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3361.0041906190186!2d44.00558167595396!3d32.606071773735536!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15596970533a4453%3A0x1eae77b749ff2aad!2z2KfZhNmF2LHZg9iyINin2YTYtdit2Yog2YHZiiDYrdmKINin2YTZhdmI2LjZgdmK2YY!5e0!3m2!1sen!2siq!4v1763073093419!5m2!1sen!2siq"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </Container>
    </section>
  );
};

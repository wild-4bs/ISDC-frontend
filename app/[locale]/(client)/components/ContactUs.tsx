"use client";

import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "@emailjs/browser";
import { Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

export const ContactUs = () => {
  const contactTrans = useTranslations("home.contact");

  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({ email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      await emailjs.send(
        "service_nlzsp9h",
        "template_054akmq",
        {
          from_email: formData.email,
          message: formData.message,
        },
        "JWmSVr8sijYNJm0tE",
      );

      toast.success("تم إرسال رسالتك بنجاح. سيتواصل معك فريقنا الطبي قريباً.");
      setFormData({ email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Email error:", error);
      alert("Failed to send message.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="my-14">
      <Container>
        <header className="text-center mb-10">
          <h2 className="font-bold text-3xl mb-1">{contactTrans("title")}</h2>
          <p className="font-normal text-xl">{contactTrans("caption")}</p>
        </header>

        <div className="flex gap-12 max-lg:flex-col">
          <form
            onSubmit={handleSubmit}
            className="form w-full flex-1 [&_label]:font-semibold"
          >
            <div className="grid gap-2 w-full mb-5">
              <Label htmlFor="email">
                {contactTrans("inputs.email.label")}
              </Label>
              <Input
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder={contactTrans("inputs.email.placeholder")}
                type="email"
                className="rounded-full"
                disabled={isPending}
              />
            </div>

            <div className="grid gap-2 w-full">
              <Label htmlFor="message">
                {contactTrans("inputs.message.label")}
              </Label>
              <Textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder={contactTrans("inputs.message.placeholder")}
                className="min-h-[130px] resize-y"
                disabled={isPending}
              />
            </div>

            <Button
              type="submit"
              className="w-[120px] mt-4"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  {contactTrans("inputs.send")}
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          {/* Map Section */}
          <div className="lg:flex-1 w-full min-h-[300px] h-[300px] rounded-xl overflow-hidden border border-input">
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

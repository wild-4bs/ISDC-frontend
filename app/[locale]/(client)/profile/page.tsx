import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Appointments } from "./components/Apointments";

export default function page() {
  return (
    <main>
      <header
        className="min-h-[30vh] text-white pt-24"
        style={{ background: "linear-gradient(45deg, #3471DC, #214194)" }}
      >
        <Container>
          <h1 className="text-4xl font-bold mb-2">احمد عبد الرسول</h1>
          <dl className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-row-reverse">
              <dt>
                <Mail width={18} />
              </dt>
              <dd>ahmed.mohmed4@email.com</dd>
            </div>
            <div className="flex items-center gap-2 flex-row-reverse">
              <dt>
                <Phone width={18} />
              </dt>
              <dd>964+ 07708228788</dd>
            </div>
          </dl>
        </Container>
      </header>
      <Appointments />
    </main>
  );
}

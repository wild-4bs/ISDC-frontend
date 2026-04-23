import { DoctorsFeature } from "@/features/doctors";
import { DialogProvider } from "@/providers/dialog";

export default function page() {
  return (
    <DialogProvider>
      <DoctorsFeature />
    </DialogProvider>
  );
}

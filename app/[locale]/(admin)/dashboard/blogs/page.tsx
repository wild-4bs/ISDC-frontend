import { BlogsFeature } from "@/features/blogs";
import { DialogProvider } from "@/providers/dialog";

export default function page() {
  return (
    <DialogProvider>
      <BlogsFeature />
    </DialogProvider>
  );
}

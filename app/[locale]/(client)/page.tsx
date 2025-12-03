import { About } from "./components/About";
import { Blogs } from "./components/blogs";
import { ContactUs } from "./components/ContactUs";
import { Hero } from "./components/Hero";
import { Projects } from "./components/projects";
import { Services } from "./components/services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Projects />
      <Blogs />
      <ContactUs />
    </main>
  );
}

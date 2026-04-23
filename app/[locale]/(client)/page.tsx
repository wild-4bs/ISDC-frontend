import { About } from "./components/About";
import { Blogs } from "./components/blogs";
import { ContactUs } from "./components/ContactUs";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Services } from "./components/services";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Blogs />
      <ContactUs />
    </main>
  );
}

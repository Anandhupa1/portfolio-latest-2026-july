import Background from "@/components/Background";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectTickets from "@/components/ProjectTickets";
import Stack from "@/components/Stack";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Background />
      <Nav />
      <main>
        <Hero />
        <ProjectTickets />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

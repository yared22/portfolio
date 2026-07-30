import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { Button } from "./ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden" aria-labelledby="hero-heading">
      <div className="absolute inset-0 bg-hero-gradient opacity-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--glow)/0.15),transparent_50%)]" />

      <div className="container mx-auto px-4 z-10">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-block animate-scale-in">
            <span className="text-primary font-mono text-sm md:text-base">
              Hi, I'm
            </span>
          </div>

          <h1
            id="hero-heading"
            className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-hero-gradient animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            YARED NEGASSI
          </h1>
          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
           I turn ideas into reliable digital solutions
          </p>

          <div
            className="flex gap-4 justify-center pt-4 animate-fade-in"
            style={{ animationDelay: "0.6s" }}
            role="group"
            aria-label="Social media links"
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-all hover:scale-110"
              onClick={() =>
                window.open(
                  "https://github.com/yared22",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              aria-label="Visit GitHub profile"
            >
              <Github className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-all hover:scale-110"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/yared-negassi/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              aria-label="Visit LinkedIn profile"
            >
              <Linkedin className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-all hover:scale-110"
              onClick={() =>
                window.open(
                  "https://discord.gg/yared222",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              aria-label="Join Discord server"
            >
              <SiDiscord className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full transition-all hover:scale-110"
              onClick={() =>
                (window.location.href = "mailto:yarednegassi@gmail.com")
              }
              aria-label="Send email to Yared Negassi"
            >
              <Mail className="h-5 w-5" />
            </Button>
          </div>

          <div
            className="pt-8 animate-fade-in"
            style={{ animationDelay: "0.8s" }}
          >
            <Button
              onClick={() => scrollToSection("projects")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
              aria-label="View my work projects"
            >
              View My Work
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 inset-x-0 flex justify-center">
        <button
          onClick={() => scrollToSection("about")}
          className="animate-bounce cursor-pointer bg-transparent border-none"
          aria-label="Scroll to about section"
        >
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </button>
      </div>
    </section>
  );
};

export default Hero;

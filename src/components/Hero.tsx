import { Github, Linkedin, Mail, ChevronDown } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import ReactionDiffusionBackground from "./ReactionDiffusionBackground";
import { Button } from "./ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background" aria-labelledby="hero-heading">
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="hero-reaction-diffusion-overlay absolute inset-0 bg-background/90" />
        <div className="hero-reaction-diffusion-gradient absolute inset-0 bg-gradient-to-b from-background/95 via-background/85 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--glow)/0.12),transparent_55%)]" />
        <ReactionDiffusionBackground />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center space-y-6 animate-fade-in">
          <div className="inline-block animate-scale-in">
            <span className="inline-block rounded-[2px] font-mono text-sm leading-none text-primary md:text-base">
              Hi, I'm
            </span>
          </div>

          <div className="mx-auto w-fit max-w-full">
            <h1
              id="hero-heading"
              className="relative z-0 text-4xl md:text-6xl lg:text-7xl font-bold leading-none bg-clip-text text-transparent bg-hero-gradient animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              YARED NEGASSI
            </h1>
          </div>
          <p
            className="mx-auto w-fit max-w-full text-lg font-medium leading-none text-foreground animate-fade-in md:text-xl"
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

      <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center">
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

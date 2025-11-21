import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Github, Linkedin, Mail } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { Button } from "./ui/button";

const Contact = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div
          ref={ref}
          className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-hero-gradient">
            Let's Connect
          </h2>

          <p className="text-lg text-muted-foreground mb-8">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your visions.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Button
              variant="outline"
              size="lg"
              className="gap-2 transition-all hover:scale-105"
              onClick={() =>
                (window.location.href = "mailto:yarednegassi@gmail.com")
              }
            >
              Email Me
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 transition-all hover:scale-105"
              onClick={() =>
                window.open(
                  "https://github.com/yared22",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <Github className="h-5 w-5" />
              GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 transition-all hover:scale-105"
              onClick={() =>
                window.open(
                  "https://discord.gg/yared222",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <SiDiscord className="h-5 w-5" />
              Discord
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 transition-all hover:scale-105"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/yared-negassi/",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </Button>
          </div>

          <div className="pt-8 border-t border-border">
            <p className="text-muted-foreground">
              © YARED NEGASSI.  All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

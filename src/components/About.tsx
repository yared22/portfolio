import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const About = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 md:py-32" aria-labelledby="about-heading">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="hidden md:flex justify-center md:justify-start">
              <div style={{ width: '800px', height: '600px' }}>
                <DotLottieReact
                  src="https://lottie.host/93f68957-26cb-4362-ae1a-440ec257502d/Siudr4jizt.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>

            <div className="space-y-4 text-muted-foreground text-lg max-w-3xl mx-auto md:max-w-none">
              <h2 id="about-heading" className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-hero-gradient">
            About Me
          </h2>
              <p>
                I'm a motivated full stack web developer with hands-on experience building practical,
                data-driven applications. I specialize in both frontend and backend development,
                creating clean user interfaces, efficient backend systems, and optimized data workflows.
              </p>

              <p>
                I've worked on real-world projects such as dashboards, booking systems, ecommerce platforms using technologies like Vue 3, react, Nuxt, Next, Node.js, PHP, and MySQL.
                I'm passionate about building systems that solve real problems, especially those involving
                data visualization, automation, and user experience.
              </p>

              <p>
                I enjoy learning new tools, especially in web and mobile development, and continually improving
                my skills in scalable architecture, API design, and app performance. When I'm not coding,
                I'm exploring new technologies, designing ideas for my next project, or strengthening my
                mobile development and Flutter skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

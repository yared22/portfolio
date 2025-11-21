import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

type Project = {
  title: string;
  description: string;
  tags: string[];
  images: string[];
};

const projects: Project[] = [
  {
    title: 'Reporting Dashboard',
     description: 'Comprehensive data visualization dashboard with CSV uploads, dynamic charts, and weekly reporting system.',
  tags: ['Vue 3', 'Nuxt', 'Tailwind CSS', 'MySQL', 'RESTful API'],
    images: [
  '/projects/mesmer1.jpg',
  '/projects/mesmer2.jpg',
  '/projects/memser3.jpg',
],
  },
  {
  title: 'EventEase Booking Platform',
  description: 'Multi-role event management system for booking venues, coordinating freelancers, and managing event logistics.',
  tags: ['Vue 3', 'Nuxt', 'Tailwind CSS', 'MySQL', 'RESTful API'],
    images: [
  '/projects/eventease1.jpg',
  '/projects/eventease2.jpg',
  '/projects/eventease3.jpg',
],
  },
  {
  title: 'OfficeLink Booking Platform',
  description: 'Platform for reserving coworking spaces, meeting rooms, and managing office amenities with ease.',
  tags: ['HTML', 'CSS', 'PHP', 'MySQL'],
    images: [
  '/projects/officelink1.jpg',
  '/projects/officelink2.jpg',
  '/projects/officelink3.jpg',
],
  },
//   {
//     title: 'Social Media App',
//     description: 'Social networking platform with posts, messaging, notifications, and user profiles.',
//     tags: ['React Native', 'Firebase', 'Redux', 'Node.js'],
//     images: [
//   '/projects/ecommerce-1.png',
//   '/projects/ecommerce-2.png',
//   '/projects/ecommerce-3.png',
// ],
//   },
//   {
//     title: 'Weather Forecast App',
//     description: 'Beautiful weather app with location-based forecasts, interactive maps, and weather alerts.',
//     tags: ['React', 'OpenWeather API', 'Mapbox', 'CSS'],
//     images: [
//   '/projects/ecommerce-1.png',
//   '/projects/ecommerce-2.png',
//   '/projects/ecommerce-3.png',
// ],
//   },
//   {
//     title: 'Portfolio CMS',
//     description: 'Content management system for portfolios with drag-and-drop builder and custom themes.',
//     tags: ['Next.js', 'Sanity', 'TypeScript', 'Vercel'],
//     images: [
//   '/projects/ecommerce-1.png',
//   '/projects/ecommerce-2.png',
//   '/projects/ecommerce-3.png',
// ],
//   },
];

const ProjectImageCarousel = ({ project }: { project: Project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.images;

  const showPrev = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const showNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (!images.length) return;

    let timeoutId: number;

    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 6000;

      timeoutId = window.setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        scheduleNext();
      }, delay);
    };

    scheduleNext();

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [images.length]);

  const currentImage = images[currentImageIndex];

  return (
    <div className="relative overflow-hidden">
      <img
  key={currentImage} 
  src={currentImage}
  alt={project.title}
  className="w-full h-48 object-cover transition-opacity duration-900 opacity-100 group-hover:scale-110"
/>
      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-80" />
      {images.length > 1 && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-3">
          <button
            type="button"
            onClick={showPrev}
            className="h-9 w-9 rounded-full border border-white/20 bg-black/30 text-white flex items-center justify-center text-base shadow-lg backdrop-blur-sm hover:bg-white/20 hover:scale-105 hover:-translate-x-0.5 transition-all"
          >
            <span className="-mt-0.5">&lt;</span>
          </button>
          <button
            type="button"
            onClick={showNext}
            className="h-9 w-9 rounded-full border border-white/20 bg-black/30 text-white flex items-center justify-center text-base shadow-lg backdrop-blur-sm hover:bg-white/20 hover:scale-105 hover:translate-x-0.5 transition-all"
          >
            <span className="-mt-0.5">&gt;</span>
          </button>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-hero-gradient">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <Card 
                key={project.title}
                className={`overflow-hidden group hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <ProjectImageCarousel project={project} />

                <div className="p-6">
                  <h3 className="font-semibold text-xl mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-primary/10 text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
{/*                   
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Github className="h-4 w-4" />
                      Code
                    </Button>
                  </div> */}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;

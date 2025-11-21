import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Code2, Database, Layout, Server, Smartphone, Zap } from 'lucide-react';
import { Card } from './ui/card';

const skills = [
  {
    icon: Layout,
    title: 'Frontend',
    items: ['Vue 3', 'Nuxt', 'Tailwind CSS', 'Material UI'],
  },
  {
    icon: Server,
    title: 'Backend',
    items: ['Node.js', 'RESTful API development', 'CRUD operations'],
  },
  {
    icon: Database,
    title: 'Database',
    items: ['MySQL', 'SQLite','MongoDB'],
  },
  {
    icon: Code2,
    title: 'Languages',
    items: ['JavaScript (ES6+)', 'HTML5', 'CSS3'],
  },
  {
    icon: Zap,
    title: 'Tools',
    items: ['Git', 'Figma', 'Unit Testing', 'Agile'],
  },
{
    icon: Smartphone,
    title: 'Responsive',
    items: ['Mobile-First', 'Accessibility', 'SEO', 'Performance'],
  },
];

const Skills = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-hero-gradient">
            Skills & Expertise
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <Card 
                  key={skill.title}
                  className={`p-6 hover:border-primary/50 transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-3">{skill.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <span 
                            key={item}
                            className="text-sm px-3 py-1 rounded-full bg-primary/10 text-foreground"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

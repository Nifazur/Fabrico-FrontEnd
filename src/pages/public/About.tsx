import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Gem, Leaf, Scissors, Users, ArrowRight, Instagram, Facebook, Twitter } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

// --- Reusable Helper Components ---
const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto">
    <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{title}</h2>
    <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
  </div>
);

// --- 1. Hero Section ---
const HeroSection: React.FC = () => (
  <section className="relative h-[60vh] bg-black">
    <img 
      src="https://images.unsplash.com/photo-1551232864-3f0890e58e35?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
      alt="Our team working on designs"
      className="absolute inset-0 w-full h-full object-cover opacity-40"
    />
    <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-4">
      <p className="text-lg font-semibold text-primary">ABOUT EUPHORIA</p>
      <h1 className="text-4xl md:text-6xl font-bold mt-2">Our Story</h1>
      <p className="mt-4 max-w-2xl text-lg text-white/90">
        Crafting fashion that feels like you. Discover the journey, values, and people behind the style.
      </p>
    </div>
  </section>
);

// --- 2. Mission Section ---
const MissionSection: React.FC = () => (
  <section>
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <div className="rounded-lg overflow-hidden shadow-lg">
        <img 
          src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
          alt="A stylish model wearing our clothes"
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Who We Are</h2>
        <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
          <p>
            Euphoria was born from a simple idea: that fashion should be effortless, expressive, and accessible. 
            We started in a small studio with a passion for creating high-quality apparel that doesn't just look good, but feels incredible to wear.
          </p>
          <p>
            We believe that what you wear is a form of self-expression. Our team is dedicated to sourcing the finest materials and designing timeless pieces with a modern twist, ensuring that every item in our collection is something you'll love for years to come.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// --- 3. Journey (Timeline) Section ---
const JourneySection: React.FC = () => {
    const timelineEvents = [
        { year: "2019", title: "The Spark", description: "Our founders, a designer and a marketer, sketch the first Euphoria designs on a coffee shop napkin.", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500" },
        { year: "2021", title: "First Collection Launch", description: "After months of sourcing and perfecting, we launch our first collection online to a small but passionate audience.", img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=500" },
        { year: "2023", title: "Expanding Our Roots", description: "We moved into our first official headquarters and expanded our team, focusing on sustainable practices.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500" },
        { year: "Today", title: "A Growing Community", description: "Euphoria is now a thriving brand, loved by thousands worldwide, with a commitment to quality and style.", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500" },
    ];

    return (
        <section>
            <SectionTitle title="Our Journey" subtitle="From a simple idea to a beloved brand, here's a look at our story." />
            <div className="mt-16 relative">
                {/* The vertical line */}
                <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-border hidden md:block" />

                <div className="space-y-16">
                    {timelineEvents.map((event, index) => (
                        <div key={event.year} className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Text (order changes based on index) */}
                            <div className={`space-y-2 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                <p className="text-primary font-semibold">{event.year}</p>
                                <h3 className="text-2xl font-bold text-foreground">{event.title}</h3>
                                <p className="text-muted-foreground">{event.description}</p>
                            </div>
                            {/* Image (order changes based on index) */}
                            <div className={`rounded-lg overflow-hidden shadow-lg ${index % 2 === 0 ? 'md:order-first' : ''}`}>
                                <img src={`${event.img}&q=80&fit=crop`} alt={event.title} className="w-full h-64 object-cover"/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


// --- 4. Values ("Behind the Seams") Section ---
const ValuesSection: React.FC = () => {
    const values = [
        { icon: Gem, title: "Quality Craftsmanship", description: "Every stitch, seam, and fabric is chosen with an obsession for quality, ensuring your pieces last." },
        { icon: Leaf, title: "Sustainable Practices", description: "We are committed to reducing our footprint by using eco-friendly materials and ethical production." },
        { icon: Scissors, title: "Thoughtful Design", description: "Our in-house designers create timeless styles infused with modern, on-trend details for a perfect fit." },
        { icon: Users, title: "Community First", description: "We're more than a brand; we're a community. Your feedback and happiness are our top priorities." },
    ];

    return (
        <section className="bg-muted/40 rounded-lg py-20 px-8">
            <SectionTitle title="Behind the Seams" subtitle="The principles and values that guide every decision we make." />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map(value => (
                    <div key={value.title} className="text-center flex flex-col items-center">
                        <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">
                            <value.icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-lg font-semibold text-foreground">{value.title}</h3>
                        <p className="mt-2 text-muted-foreground text-sm">{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

// --- 5. Team Section ---
const TeamSection: React.FC = () => {
    const teamMembers = [
        { name: "Jessica Lane", role: "Founder & CEO", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
        { name: "Alex Carter", role: "Head of Design", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
        { name: "Samantha Blue", role: "Marketing Director", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400" },
    ];

    return (
        <section>
            <SectionTitle title="Meet Our Team" subtitle="The passionate individuals dedicated to bringing you the best in fashion." />
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map(member => (
                    <Card key={member.name} className="text-center overflow-hidden group">
                        <div className="aspect-square overflow-hidden">
                            <img src={`${member.img}&q=80&fit=crop&crop=faces`} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <p className="text-primary">{member.role}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
};

// --- 6. Community Section ---
const CommunitySection: React.FC = () => (
    <section>
        <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400" className="rounded-lg shadow-md aspect-[3/4] object-cover" alt="Community member 1"/>
                <img src="https://images.unsplash.com/photo-1525845859779-54d477ff291f?w=400" className="rounded-lg shadow-md aspect-[3/4] object-cover mt-8" alt="Community member 2"/>
            </div>
            <div className="text-center lg:text-left">
                <h2 className="text-3xl font-bold text-foreground">Join Our Community</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                    Follow us on social media and become part of the Euphoria family. Share your style with #EuphoriaStyle for a chance to be featured!
                </p>
                <div className="mt-6 flex justify-center lg:justify-start gap-4">
                    <Button variant="outline" size="icon"><Instagram className="h-5 w-5"/></Button>
                    <Button variant="outline" size="icon"><Facebook className="h-5 w-5"/></Button>
                    <Button variant="outline" size="icon"><Twitter className="h-5 w-5"/></Button>
                </div>
            </div>
        </div>
    </section>
);


// --- 7. Call to Action Section ---
const CallToActionSection: React.FC = () => (
    <section>
        <div className="bg-primary/10 rounded-lg text-center p-12">
            <h2 className="text-3xl font-bold text-foreground">Ready to Find Your Style?</h2>
            <p className="mt-2 max-w-xl mx-auto text-muted-foreground">
                Browse our latest collections and discover pieces that speak to you. Your new favorite outfit is just a click away.
            </p>
            <Button asChild size="lg" className="mt-6">
                <Link to="/products">
                    Shop Our Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </Button>
        </div>
    </section>
);


// --- Main About Us Page Component ---
const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-background">
      <HeroSection />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 space-y-24 my-24">
        <MissionSection />
        <JourneySection />
        <ValuesSection />
        <TeamSection />
        <CommunitySection />
        <CallToActionSection />
      </div>
    </div>
  );
};

export default AboutUsPage

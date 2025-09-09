import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa6'
import { Separator } from '../../ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../ui/accordion'
import { Button } from '../../ui/button'

const footerSections = [
  {
    id: 'help',
    title: 'Need Help',
    links: ['Contact Us', 'Track Order', 'Returns & Refunds', "FAQ's", 'Career'],
  },
  {
    id: 'company',
    title: 'Company',
    links: ['About Us', 'euphoria Blog', 'euphoriastan', 'Collaboration', 'Media'],
  },
  {
    id: 'info',
    title: 'More Info',
    links: ['Term and Conditions', 'Privacy Policy', 'Shipping Policy', 'Sitemap'],
  },
  {
    id: 'location',
    title: 'Location',
    links: [
      'support@euphoria.in',
      'Eklingpura Chouraha, Ahmedabad Main Road',
      '(NH 8- Near Mahadev Hotel) Udaipur, India- 313002',
    ],
  },
]

const popularCategories = ['Women', 'Men', 'Kids', 'Accessories', 'Home & Living']

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        {/* Mobile: accordion columns */}
        <div className="md:hidden space-y-2">
          <Accordion type="single" collapsible className="w-full">
            {footerSections.map((section) => (
              <AccordionItem
                key={section.id}
                value={section.id}
                className="border-b border-border"
              >
                <AccordionTrigger className="py-3 text-base font-medium text-foreground">
                  {section.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="pb-4 space-y-3">
                    {section.links.map((link, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Desktop: 4 columns + Download */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {footerSections.slice(0, 4).map((section) => (
            <div key={section.id}>
              <h3 className="text-xl font-semibold text-foreground mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Download the App */}
          <div className='place-items-end'>
            <h3 className="text-xl font-semibold text-foreground mb-4">Download The App</h3>
            <div className=" space-y-2">
              <img className='w-[153px]' src="/PlayStore.png" alt="" />
              <img className='w-[153px]' src="/AppStore.png" alt="" />
            </div>
          </div>
        </div>

        {/* Social + Download (visible on all; aligns to right on desktop) */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Social icons */}
          <div className="flex items-center gap-3">
            {[
              { Icon: FaFacebookF, label: 'Facebook' },
              { Icon: FaInstagram, label: 'Instagram' },
              { Icon: FaTwitter, label: 'Twitter' },
              { Icon: FaLinkedin, label: 'LinkedIn' },
            ].map(({ Icon, label }) => (
              <Button
                key={label}
                variant="secondary"
                size="icon"
                aria-label={label}
                className="rounded-xl h-9 w-9 bg-foreground text-background hover:bg-foreground/90"
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>

          {/* Download (mobile visible already above, but keep here for symmetry) */}
          <div className="md:hidden w-full place-items-center ">
            <h3 className="text-xl font-semibold text-foreground mb-3">Download The App</h3>
            <div className='space-y-2'>
              <img className='w-[153px]' src="/PlayStore.png" alt="" />
              <img className='w-[153px]' src="/AppStore.png" alt="" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-8">
          <Separator className="bg-border" />
        </div>

        {/* Popular Categories */}
        <div className="mt-2">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="categories" className="border-b-0">
              <AccordionTrigger className="py-4 text-base font-medium text-foreground hover:no-underline">
                Popular Categories
              </AccordionTrigger>
              <AccordionContent>
                <div className="pb-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-2">
                  {popularCategories.map((c) => (
                    <a
                      key={c}
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {c}
                    </a>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Bottom divider */}
        <Separator className="bg-border" />

        {/* Copyright */}
        <div className="py-6 text-center text-sm text-muted-foreground">
          Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
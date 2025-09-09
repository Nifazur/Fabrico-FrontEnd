// src/pages/TermsAndConditionsPage.tsx
import React from 'react';

// --- Reusable Helper Components (defined within this file for simplicity) ---

// A styled component for section titles
const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">{children}</h2>
);

// A styled component for standard paragraphs
const Paragraph: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
);

// A styled component for bulleted lists
const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
    <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
        {items.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ul>
);


// --- Main Terms and Conditions Page Component ---

export const TermsAndConditionsPage: React.FC = () => {
    return (
        <div className="bg-background">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">

                {/* Page Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">Terms and Conditions</h1>
                    <p className="mt-4 text-lg text-muted-foreground">Last updated: October 26, 2023</p>
                </div>

                <article className="prose dark:prose-invert max-w-none">
                    <Paragraph>
                        Welcome to Fabrico! These terms and conditions outline the rules and regulations for the use of
                        Fabrico's Website, located at [Your Website URL]. By accessing this website we assume you
                        accept these terms and conditions. Do not continue to use Fabrico if you do not agree to take
                        all of the terms and conditions stated on this page.
                    </Paragraph>

                    <SectionTitle>1. Definitions</SectionTitle>
                    <Paragraph>
                        The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer
                        Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this
                        website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We",
                        "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the
                        Client and ourselves.
                    </Paragraph>

                    <SectionTitle>2. Use of the Website</SectionTitle>
                    <Paragraph>
                        By using our website, you warrant that you are at least 18 years of age and you possess the
                        legal authority to create a binding legal obligation. You agree not to use this website for any
                        unlawful purpose or any purpose prohibited under this clause.
                    </Paragraph>
                    <BulletList items={[
                        "You are granted a limited license to access and make personal use of this website.",
                        "This license does not include any resale or commercial use of this site or its contents.",
                        "Any unauthorized use terminates the permission or license granted by Fabrico."
                    ]} />

                    <SectionTitle>3. Products</SectionTitle>
                    <Paragraph>
                        We endeavor to describe and display products as accurately as possible. However, we cannot
                        guarantee that the color, texture, or detail of the product shown on your screen will be
                        completely accurate. All product descriptions are subject to change at any time without notice,
                        at our sole discretion. We reserve the right to discontinue any product at any time.
                    </Paragraph>

                    <SectionTitle>4. Orders and Payment</SectionTitle>
                    <Paragraph>
                        When you place an order, you are offering to buy the product(s) for the price stated, subject
                        to these Terms. We reserve the right to accept or reject your order for any reason, including
                        the unavailability of any product, an error in the price or product description, or an error
                        in your order.
                    </Paragraph>

                    <SectionTitle>5. Intellectual Property Rights</SectionTitle>
                    <Paragraph>
                        Other than the content you own, under these Terms, Fabrico and/or its licensors own all the
                        intellectual property rights and materials contained in this Website. You are granted limited
                        license only for purposes of viewing the material contained on this Website. "Fabrico" and our
                        logos are our registered trademarks.
                    </Paragraph>

                    <SectionTitle>6. Limitation of Liability</SectionTitle>
                    <Paragraph>
                        In no event shall Fabrico, nor any of its officers, directors, and employees, be held liable
                        for anything arising out of or in any way connected with your use of this Website whether such
                        liability is under contract. Fabrico, including its officers, directors, and employees shall not
                        be held liable for any indirect, consequential, or special liability arising out of or in any
                        way related to your use of this Website.
                    </Paragraph>

                    <SectionTitle>7. Governing Law & Jurisdiction</SectionTitle>
                    <Paragraph>
                        These Terms will be governed by and interpreted in accordance with the laws of the State of [Your State/Country],
                        and you submit to the non-exclusive jurisdiction of the state and federal courts located in
                        [Your City/Country] for the resolution of any disputes.
                    </Paragraph>

                    <SectionTitle>8. Changes to Terms</SectionTitle>
                    <Paragraph>
                        We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
                        By continuing to access or use our Service after those revisions become effective, you agree
                        to be bound by the revised terms.
                    </Paragraph>

                    <SectionTitle>Contact Us</SectionTitle>
                    <Paragraph>
                        If you have any questions about these Terms, please contact us at:
                        <br />
                        Email: <a href="mailto:support@Fabrico.com" className="text-primary hover:underline">support@Fabrico.com</a>
                        <br />
                        Address: [Your Company Address]
                    </Paragraph>
                </article>
            </div>
        </div>
    );
};
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import "./Landing.css";

import { Seo } from "../../components/common/Seo/Seo";

import { buildWebsiteSchema, buildEducationalOrgSchema, buildFaqSchema, combineSchemas } from "../../utils/seo/buildJsonLd";
import { trackEvent, ANALYTICS_EVENTS } from "../../utils/analytics";
import { useScrollDepthTracking } from "../../hooks/useScrollDepthTracking";

import { LandingSection } from "../../components/landing/LandingSection/LandingSection";
import { HeroSection } from "../../components/landing/HeroSection/HeroSection";
import { BenefitsSection } from "../../components/landing/BenefitsSection/BenefitsSection";
import { HowItWorksSection } from "../../components/landing/HowItWorksSection/HowItWorksSection";
import { ProductPreviewSection } from "../../components/landing/ProductPreviewSection/ProductPreviewSection";
import { FeaturesSection } from "../../components/landing/FeaturesSection/FeaturesSection";
import { LanguagesSection } from "../../components/landing/LanguagesSection/LanguagesSection";
import { SpacedRepetitionSection } from "../../components/landing/SpacedRepetitionSection/SpacedRepetitionSection";
import { TestimonialsSection } from "../../components/landing/TestimonialsSection/TestimonialsSection";
import { FaqSection } from "../../components/landing/FaqSection/FaqSection";
import { FAQS } from "../../constants/landingFaqs";
import { FinalCtaSection } from "../../components/landing/FinalCtaSection/FinalCtaSection";

const LANDING_JSON_LD = combineSchemas(
    buildWebsiteSchema(),
    buildEducationalOrgSchema(),
    buildFaqSchema(FAQS)
);

// No real testimonial exists yet - kept empty on purpose rather than
// fabricating quotes (see TestimonialsSection.jsx). The section below
// simply doesn't render while this is empty; fill it in once there's real
// data and it (and its background-tone slot) appears automatically.
const TESTIMONIALS = [];

export function Landing() {

    const navigate = useNavigate();

    // Scroll-depth sentinels: real section boundaries, not a measured %
    // of document height (see useScrollDepthTracking.js for why).
    const benefitsRef = useRef(null);
    const previewRef = useRef(null);
    const faqRef = useRef(null);
    const finalCtaRef = useRef(null);

    useScrollDepthTracking([
        { depth: 25, ref: benefitsRef },
        { depth: 50, ref: previewRef },
        { depth: 75, ref: faqRef },
        { depth: 100, ref: finalCtaRef }
    ]);

    // Every trackEvent call for this page goes through here (or
    // handleFaqOpen below) - section components stay presentational and
    // only call the callback prop they're given, they never import
    // trackEvent themselves.
    function handleCtaClick(cta, location, destination) {
        trackEvent(ANALYTICS_EVENTS.LANDING_CTA_CLICKED, { cta, location });
        navigate(destination);
    }

    function handleFaqOpen(question) {
        trackEvent(ANALYTICS_EVENTS.LANDING_FAQ_OPENED, { question });
    }

    // Alternates surface/background per rendered section, driven by render
    // order rather than a hardcoded tone per section - stays correct even
    // though the testimonials section conditionally doesn't render at all.
    let toneIndex = 0;
    const nextTone = () => (toneIndex++ % 2 === 0 ? "surface" : "background");

    return (

        <div className="landing animate-fade-in">

            <Seo
                description="Aprenda inglês, francês ou português com lições estruturadas por nível (CEFR), conteúdo autêntico com tradução instantânea, um acervo pessoal de vocabulário e revisão espaçada. Grátis para começar."
                path="/"
                jsonLd={LANDING_JSON_LD}
            />

            <HeroSection onPrimaryCta={() => handleCtaClick("comecar_agora", "hero", "/choose-language")} />

            <LandingSection
                eyebrow="Benefícios"
                title="Por que estudar com o Glossio"
                tone={nextTone()}
                sectionRef={benefitsRef}
            >
                <BenefitsSection />
            </LandingSection>

            <LandingSection
                eyebrow="Como funciona"
                title="Do primeiro clique à primeira lição"
                tone={nextTone()}
            >
                <HowItWorksSection />
            </LandingSection>

            <LandingSection
                eyebrow="Por dentro do app"
                title="Veja como é estudar no Glossio"
                tone={nextTone()}
                sectionRef={previewRef}
            >
                <ProductPreviewSection />
            </LandingSection>

            <LandingSection
                eyebrow="Recursos principais"
                title="Os quatro pilares"
                subtitle="Learn, Explore, Collect e Review — um único ecossistema, não quatro ferramentas separadas."
                tone={nextTone()}
            >
                <FeaturesSection />
            </LandingSection>

            <LandingSection
                eyebrow="Idiomas disponíveis"
                title="Escolha um idioma e comece agora"
                subtitle="Do zero ao avançado — A1 a C2, no padrão CEFR."
                tone={nextTone()}
            >
                <LanguagesSection />
            </LandingSection>

            <LandingSection
                eyebrow="Retenção"
                title="Como funciona a repetição espaçada"
                tone={nextTone()}
            >
                <SpacedRepetitionSection />
            </LandingSection>

            {TESTIMONIALS.length > 0 && (
                <LandingSection
                    eyebrow="Depoimentos"
                    title="Quem estuda com o Glossio"
                    tone={nextTone()}
                >
                    <TestimonialsSection testimonials={TESTIMONIALS} />
                </LandingSection>
            )}

            <LandingSection
                eyebrow="Dúvidas"
                title="Perguntas frequentes"
                tone={nextTone()}
                sectionRef={faqRef}
            >
                <FaqSection onFaqOpen={handleFaqOpen} />
            </LandingSection>

            <LandingSection tone={nextTone()} sectionRef={finalCtaRef}>
                <FinalCtaSection onCta={() => handleCtaClick("criar_conta", "final_cta", "/register")} />
            </LandingSection>

        </div>

    );

}

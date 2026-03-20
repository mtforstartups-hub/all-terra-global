import PageHero from "@/components/shared/PageHero";
import PageCta from "@/components/shared/PageCta";
import OpportunitiesList from "@/components/opportunities/OpportunitiesList";
import Stats from "@/components/opportunities/Stats";
import WhyInvest from "@/components/opportunities/WhyInvest";

export default function OpportunitiesPage() {
    return (
        <>
            <PageHero
                label="Investment Portfolio"
                title="Current Investment Opportunities"
                description="High-yield, asset-backed investment opportunities across mining, real estate, and financing sectors."
                backgroundImage="https://images.unsplash.com/photo-1551836022-4c4c79ecde51?auto=format&fit=crop&w=2000&q=80"
                imageAlt="Investment landscape"
            />
            <Stats />
            <OpportunitiesList />
            <WhyInvest />
            <PageCta
                title="Ready to Start Investing?"
                description="Contact us to discuss investment structures tailored to your needs."
                variant="dark"
                primaryButton={{ text: "Schedule a Call", href: "/contact", showArrow: true }}
            />
        </>
    );
}

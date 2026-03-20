import PageHero from "@/components/shared/PageHero";
import PageCta from "@/components/shared/PageCta";
import Directors from "@/components/team/Directors";
import GeneralPartner from "@/components/team/GeneralPartner";
import OtherMembers from "@/components/team/OtherMembers";
import GlobalPresence from "@/components/team/GlobalPresence";
import TeamGrid from "@/components/team/TeamGrid";

export default function TeamPage() {
    return (
        <>
            <PageHero
                label="Our People"
                title="Leadership & Team"
                description="A global team with local expertise, combining decades of experience in finance, technology, and African markets."
                backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
                imageAlt="Team collaboration"
            />
            <GeneralPartner />
            <OtherMembers />
            {/* <Directors />
            <TeamGrid /> */}
            {/* <GlobalPresence /> */}
            <PageCta
                title="Ready to Connect With Our Team?"
                description="Reach out to discuss investment opportunities and partnership possibilities."
                variant="green"
                primaryButton={{ text: "Contact Us", href: "/contact", showArrow: true }}
            />
        </>
    );
}

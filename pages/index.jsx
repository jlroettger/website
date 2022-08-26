import Hero from "../components/hero";
import Features from "../components/features/features";
import Sponsoring from "../components/sponsoring";
import FAQ from "../components/faq/faq";
import Footer from "../components/footer";
import {SocialMetaTags} from "../components/social-meta-tags";

export default function HomePage() {
    const docsIndex = '/intro'

    return (
        <>
            <SocialMetaTags title={"nutjs.dev - JavaScript desktop automation"}
                            description={"nut.js is a modern JavaScript desktop automation framework for Node.js"}/>
            <main className='w-full h-full'>
                <Hero ctaLink={docsIndex} ctaText="🚀 Let's get started!"/>
                <Features/>
                <Sponsoring/>
                <FAQ/>
                <Footer/>
            </main>
        </>
    )
}

import LandingNavbar
    from "../../components/landing/LandingNavbar";

import HeroSection
    from "../../components/landing/HeroSection";

import FeatureStrip
    from "../../components/landing/FeatureStrip";

import HowItWorks
    from "../../components/landing/HowItWorks";





const Landing = () => {

    return (

        <div className="
            min-h-screen
            bg-[#F7F3EA]
            text-gray-900
        ">

            <LandingNavbar />


            <main>

                <HeroSection />

                <FeatureStrip />

                <HowItWorks />

   

            </main>


         

        </div>
    );
};


export default Landing;
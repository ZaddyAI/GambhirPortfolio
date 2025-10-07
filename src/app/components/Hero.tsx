import { name, heroDescription, socialLinks } from "../constants"

const Hero = () => {
    return (
        <section className="ml-1 sm:ml-2 py-8 sm:py-12 lg:py-16 min-h-[70vh] flex items-center" id="hero">
            <div className="flex flex-wrap w-full">
                <div className="w-full">
                    <div className="items-center lg:items-start">
                        <p className="text-green text-sm sm:text-md font-sfMono mb-4 sm:mb-6">Hi, my name is</p>
                        <h2 className="text-lightest-slate text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-xxxl font-calibre font-semibold mt-2 leading-tight line-height-1">
                            {name}.
                        </h2>
                        <h3 className="text-slate text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-calibre font-medium mt-2 leading-tight line-height-1">
                            I build things for the web
                        </h3>
                        <p className="text-slate text-sm sm:text-md lg:text-lg mt-6 sm:mt-8 max-w-[315px] sm:max-w-[540px] mx-auto lg:mx-0 font-calibre line-height-2">
                            {heroDescription}
                        </p>
                    </div>
                </div>
                <div className="w-full mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4">
                    <a
                        href="/gambhir.pdf"
                        className="smallButton bg-green text-navy py-3 px-6 rounded text-sm sm:text-md text-center sm:hidden w-fit"
                    >
                        Download Resume
                    </a>
                    <a href={socialLinks.github} className="bigButton w-fit">
                        Check out projects
                    </a>
                </div>
            </div>
        </section>
    )
}

export default Hero

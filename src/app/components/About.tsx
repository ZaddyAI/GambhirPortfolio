import aboutImage from "@/app/assets/about.webp"
import Image from "next/image"
import { aboutParagraph1, aboutParagraph2, aboutParagraph3, aboutParagraph4, skills } from "../constants"

function About() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 text-lightest-slate" id="about">
      <div className="lg:ml-20 sm:ml-10 ml-0 px-2 sm:px-0">
        <div className="flex items-center space-x-2 sm:space-x-4 mb-8 sm:mb-10">
          <span className="text-green font-sfMono text-sm sm:text-lg">01.</span>
          <h2 className="font-calibre font-semibold text-xl sm:text-heading text-lightest-slate whitespace-nowrap">
            About Me
          </h2>
          <div className="w-[150px] sm:w-[200px] lg:w-[350px] h-px bg-lightest-navy"></div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10">
          <div className="text w-full lg:w-3/5 xl:w-2/5 line-height-2 text-slate text-sm sm:text-lg">
            <div className="space-y-4">
              <p>{aboutParagraph1}</p>
              <p>{aboutParagraph2}</p>
              <p>{aboutParagraph3}</p>
              <p dangerouslySetInnerHTML={{ __html: aboutParagraph4 }} />
              <p>Here are a few technologies I've been working with recently:</p>
            </div>
            <ul className="skills-list mt-5">
              {skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="flex justify-center lg:justify-start items-start mt-4 lg:mt-[0.5rem]">
            <div className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-80 lg:h-80 imgg">
              <Image
                src={aboutImage.src || "/placeholder.svg"}
                alt="About me"
                layout="responsive"
                width={700}
                height={700}
                className="img object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

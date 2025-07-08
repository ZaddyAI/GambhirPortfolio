import { email, contactDescription, name } from "../constants"

function Contact() {
  return (
    <section className="w-full text-center py-16" id="contacts">
      <div className="contact max-w-2xl lg:mx-0 lg:ml-[20%] md:ml-[15%] px-4 sm:px-6">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <span className="text-green font-sfMono text-sm">04. Whats Next?</span>
        </div>
        <h2 className="font-calibre font-semibold text-3xl sm:text-4xl lg:text-heading2 text-lightest-slate mb-6 sm:mb-8 line-height-1">
          Get In Touch
        </h2>
        <div className="py-6 sm:py-8 text-base sm:text-lg font-calibre mb-8 text-slate line-height-2 max-w-lg mx-auto lg:mx-0 lg:ml-auto lg:mr-auto">
          <p>{contactDescription}</p>
        </div>
        <a href={`mailto:${email}`} className="button w-fit mx-auto inline-block mb-16">
          Say Hello
        </a>
        <div className="font-sfMono text-xs hover:text-green text-light-slate transition-colors duration-300">
          <p>Build by {name}</p>
        </div>
      </div>
    </section>
  )
}

export default Contact

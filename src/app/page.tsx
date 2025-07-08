import About from "./components/About";
import Contact from "./components/Contact";
import Experiences from "./components/Experiences";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Work from "./components/Work";

export default function Home() {
    return (
        <div className="absolute top-0 z-[-2] h-screen w-screen mx-auto overflow-x-hidden bg-navy line-height-2 p-0 m-0 text-light-slate antialiased selection:bg-lightest-navy selection:text-green">
            <Navbar />
            <div className="flex flex-col lg:flex-row">
                {/* Sidebar - Hidden on small screens, visible on large screens */}
                <div className="hidden lg:block lg:w-1/6">
                    <Sidebar />
                </div>
                {/* Main Content - Full width on small screens, adjusted margin on large screens */}
                <div className="flex-1 lg:ml-[2%] p-5">
                    <Hero />
                    <About />
                    <Experiences />
                    <Work />
                    <Contact />
                </div>
            </div>
        </div>
    );
}

import CustomIconLogo from "./icons/customlogo.jsx";

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-5 sm:px-10 py-8 w-full text-white">
            <div className="flex flex-shrink-0 items-center">
                <a href="https://www.gambhirpoudel.com.np/" className="w-[50px] text-lightest-slate hover:text-green">
                    <CustomIconLogo />
                </a>
            </div>
            {/* Menus */}
            <div className="hidden sm:flex gap-6 items-center justify-center">
                <a href="#about" className="relative font-sfMono text-greenn text-lightest-slate hover:text-green text-xs">
                    <span className="text-green">01. </span>About
                </a>
                <a href="#experiences" className="relative font-sfMono text-greenn text-lightest-slate hover:text-green text-xs">
                    <span className="text-green">02. </span>Experience
                </a>
                <a href="#works" className="relative font-sfMono text-greenn text-lightest-slate hover:text-green text-xs">
                    <span className="text-green">03. </span>Work
                </a>
                <a href="#contacts" className="relative font-sfMono text-greenn text-lightest-slate hover:text-green text-xs">
                    <span className="text-green">04. </span>Contacts
                </a>
                <a
                    href="/gambhir.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="smallButton"
                >
                    Resume
                </a>
            </div>
        </nav>
    );
};

export default Navbar;

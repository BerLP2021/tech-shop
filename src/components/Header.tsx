import { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all delay-200 duration-300 ${isScrolled ? 'bg-blue-500 shadow-lg' : 'opacity-0'
                }`}
        >
            <nav className="container mx-auto flex items-center justify-between py-4 px-2 lg:px-12">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img className="w-full h-full object-cover" src="./logo.png" alt="logo" />
                </div>
                <div className="hidden md:flex items-center grow-1 text-white text-lg lg:text-2xl  ">
                    React | Typescript | Redux Toolkit | TailwindCss
                </div>
                <ul className="flex space-x-4 lg:space-x-10 text-white">
                    <li>
                        <a href="https://t.me/ThalerTimm" className="hover:text-gray-200 transition duration-200">
                            @ThalerTimm
                        </a>
                    </li>
                    <li>
                        <a href="tel:+380637738697" className="hover:text-gray-200 transition duration-200">
                            +38 063 773-86-97
                        </a>
                    </li>

                </ul>
            </nav>
        </header>
    );
};

export default Header;

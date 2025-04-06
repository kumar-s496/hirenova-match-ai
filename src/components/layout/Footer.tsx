
import { Link } from "react-router-dom";
import { Twitter, Facebook, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <span className="text-hirenova-700 font-montserrat font-bold text-2xl">HireNova</span>
            </Link>
            <p className="mt-4 text-gray-600">
              Automate and simplify candidate screening and shortlisting with advanced AI technology.
            </p>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-gray-400 hover:text-hirenova-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-hirenova-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-hirenova-600">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-hirenova-600">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Product</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-hirenova-600">Features</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-hirenova-600">Pricing</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-hirenova-600">FAQ</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-hirenova-600">About</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-hirenova-600">Contact</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-hirenova-600">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-hirenova-600">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <p className="text-gray-400">© 2025 HireNova. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

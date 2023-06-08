import logo from "../../../assets/logo.png";
import { FaGithub, FaLinkedin, FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-500 text-white py-20">
      <div className="footer max-w-screen-xl mx-auto p-10">
        <div>
          <img src={logo} className="w-20" alt="" />
          <h3 className="text-bold text-2xl ">Summer Camp School</h3>
        </div>
        <div>
          <span className="footer-title">Services</span>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </div>
        <div>
          <span className="footer-title">Contact</span>
          <Link
            to="https://github.com/masumbillah99"
            className="flex items-center gap-3 text-md"
            target="_blank"
          >
            <FaGithub className="text-lg" /> Github
          </Link>
          <Link
            to="https://www.facebook.com/profile.php?id=100036766350727"
            className="flex items-center gap-3 text-md"
            target="_blank"
          >
            <FaFacebook className="text-blue-900 text-lg" /> Facebook
          </Link>
          <Link
            to="https://www.linkedin.com/in/masumbillah99/"
            className="flex items-center gap-3 text-md"
            target="_blank"
          >
            <FaLinkedin className="text-primary text-lg" /> Linkedin
          </Link>
          <Link
            to="https://www.youtube.com/@awebtutor9986"
            className="flex items-center gap-3 text-md"
            target="_blank"
          >
            <FaYoutube className="text-orange-500 text-lg" /> Youtube
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

// Define an array of menu items
const menuItems = [
  { name: 'Home', link: '/' },
  { name: 'Faq', link: '#projects' },
  { name: 'About', link: '#about' },
  { name: 'Contact', link: '#contact' },
];

const shopItems = [
  { name: 'Products', link: '#products' },
  { name: 'Digitals', link: '#digitals' },
  { name: 'FAQs', link: '#faqs' },
  { name: 'Reviews', link: '#reviews' },
];

const socialLinks = [
  { name: 'Facebook', icon: 'fab fa-facebook-f', link: '#facebook' },
  { name: 'Twitter', icon: 'fab fa-twitter', link: '#twitter' },
  { name: 'Instagram', icon: 'fab fa-instagram', link: '#instagram' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin-in', link: '#linkedin' },
];

const Footer: React.FC = () => {
  return (
    <footer className=" p-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Menu Section */}
          <div className="flex flex-col mb-6">
            <h4 className="font-bold text-xl mb-4">Menu</h4>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Section */}
          <div className="flex flex-col mb-6">
            <h4 className="font-bold text-xl mb-4">Shop</h4>
            <ul className="space-y-2">
              {shopItems.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links Section */}
          <div className="flex flex-col mb-6">
            <h4 className="font-bold text-xl mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                  aria-label={social.name}
                >
                  <i className={`${social.icon} text-xl`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex justify-between mt-8 text-sm text-gray-500">
          <span>© 2024. All rights reserved.</span>
          <span className="text-gray-600">Siftly</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

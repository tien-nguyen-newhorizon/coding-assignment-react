import { FC } from 'react';
import { Link } from 'react-router-dom';

type HeaderProps = {
  title: string;
};

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-sky-500/75 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
          Ticket Manager
        </Link>
        <ul className="flex space-x-4">
          <li>{title}</li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;

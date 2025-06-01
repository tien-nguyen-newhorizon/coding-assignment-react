import { FC } from 'react';
import Header from '../Header';

type DashboardLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const DashboardLayout: FC<DashboardLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <Header title={title} />
      <main className="container mx-auto p-4">{children}</main>
    </div>
  );
};

export default DashboardLayout;

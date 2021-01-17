import "../styles/main.scss";

const Layout = ({ children }) => (
  <div className="flex flex-col font-sans min-h-screen bg-gray-100">
    <main className="flex flex-col flex-1 max-w-4xl mx-auto px-4 py-8 md:p-8 w-full">
      {children}
    </main>
  </div>
);

export default Layout;

import "../styles/main.scss";

const Layout = ({ children }) => (
  <div
    className="
      bg-gray-100
      dark:bg-gray-800
      dark:text-white
      flex
      flex-col
      font-sans
      min-h-screen
    "
  >
    <main
      className="
        flex
        flex-1
        flex-col
        max-w-4xl
        md:p-8
        mx-auto
        px-4
        py-8
        w-full
      "
    >
      {children}
    </main>
  </div>
);

export default Layout;

import CashConvertersLongLogo from "../components/CashConvertersLongLogo";

const DashboardHeader = ({ title }) => (
  <header className="dashboardHeader">
    <CashConvertersLongLogo />
    <div className="text-center full-width dashboardTitle">{title}</div>
    <div style={{ opacity: 0 }}>
      <CashConvertersLongLogo />
    </div>
  </header>
);

export default DashboardHeader;

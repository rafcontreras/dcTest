const Widget = ({ title, children, widgetClassName = "" }) => (
  <div className={`${widgetClassName}`}>
    <div className="dashboardWidget dashboardShadow">
      <div className="dashboardWidgetTitle">{title}</div>
      {children}
    </div>
  </div>
);

export default Widget;

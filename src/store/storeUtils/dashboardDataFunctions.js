const dashboardData = {};

async function getDashboardData(method, options) {
  const kind = "dashboardData";
  await this.dashboardWorker
    .dashboardFunctions({ options, kind, method })
    .then(response => {
      if (response) {
        const result = JSON.parse(response);
        if (result?.method === method) {
          this.setDashboardData(result);
          this.setLoaded(true);
        }
      }
    });
}

function setDashboardData(data) {
  const { method, responseTime, ...rest } = data;
  const object = {
    [method]: {
      responseTime,
      ...rest
    }
  };
  const currentDashboardData = { ...this.dashboardData, ...object };
  this.dashboardData.extend(currentDashboardData);
}

function resetDashboardData() {
  this.dashboardData.extend(dashboardData);
}

export {
  dashboardData,
  getDashboardData,
  setDashboardData,
  resetDashboardData
};

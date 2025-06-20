export const themes = {
  light: {
    color: "#333",
    background: "#ffffff",
    componentColor: "#000000",
    component: "light-component-style",
  },
  dark: {
    color: "#003245",
    background: "#003245",
    componentColor: "#f2f2f2",
    component: "#003245",
  },
};

export const basePath = "http://localhost:8000";

export const environment = {
  tokenPath: `/auth/token`,
  login: `/user/login`,
  getUsersByPagination: `/user/paginated`
};

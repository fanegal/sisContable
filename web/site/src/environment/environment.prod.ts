export const themes = {
  light: {
    primary: "#2f2f2f",
    textColor: "#333",
    textColorSecundary: "#fff",
    logo: '/logo2.png'
  },
  dark: {
  },
};

export const basePath = "http://localhost:8000";

export const environment = {
  tokenPath: `/auth/token`,
  login: `/user/login`,
  getUsersByPagination: `/user/paginated`
};

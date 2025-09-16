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

//export const basePath = "http://localhost:8000";
export const basePath = "https://www.olamsys.com/arsa-admin";

export const environment = {
  tokenPath: `/auth/token`,
  updateToken: `/auth/updateToken`,
  login: `/user/login`,
  getUsersByPagination: `/user/paginated`,
  getModulosContablesByPagination: `/modulos-contables/paginated`,
};

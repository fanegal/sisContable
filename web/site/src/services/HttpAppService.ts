import { basePath, environment } from "@/environment/environment.prod";
import { HttpService, LocalStorageEncryptService } from "common-lib";
import type { TokenProvider } from "common-lib";

class HttpAppService implements TokenProvider {
    private token: string | null = null;

    async getToken(): Promise<string | null> {
        return this.token;
    }

    async refreshToken(): Promise<string | null> {
        try {
            const authHttpService = new HttpService(basePath);
            let userSession: any = LocalStorageEncryptService.getFromLocalStorage("userSession")
            const res = await authHttpService.post(environment.tokenPath, {
                username: userSession.userSession,
                password: userSession.password
            });
            if (res.data && res.data.data && res.data.data.accessToken) {
                this.token = res.data.data.accessToken;
                return this.token;
            }
            this.token = null;
            return null;
        } catch (err) {
            console.error("Error refreshing token", err);
            this.token = null;
            return null;
        }
    }
}

// Instancia principal con tokenProvider
export const httpService = new HttpService(
    basePath,
    new HttpAppService(),
    true
);

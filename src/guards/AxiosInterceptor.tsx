import { api, apiPrivate } from "@/services/axios";
import { AxiosResponse } from "axios";
import { useEffect, useRef } from "react";


const useAxiosInterceptors = () => {
    const reqInterceptorsRef = useRef<any>(null)
    const resInterceptorsRef = useRef<any>(null)
    const isRefreshing = useRef(false)

    async function refresh() {
        api.post("/auth/refresh", null, {withCredentials: true})
    }

    function setupInterceptors() {
      reqInterceptorsRef.current = apiPrivate.interceptors.request.use(
        (config: any) => {
          const token = localStorage.getItem("ttfat");
          if (token) {
            if (!isRefreshing.current) {
              config.headers["Authorization"] = "Bearer " + token;
              return config;
            } else {
              return Promise.reject(
                `[Revalidating access] [REQUEST CANCELLED] =====> ${config.url}`
              );
            }
          } else {
            console.log(
              `[Missing Token] [REQUEST CANCELLED] =====> ${config.url}`
            );
            return Promise.reject(
              `[Missing Token] [REQUEST CANCELLED] =====> ${config.url}`
            );
          }
        },
        (error: any) => {
          console.log("[REQUEST ERROR]", error);
          return Promise.reject(error);
        }
      )

      resInterceptorsRef.current = apiPrivate.interceptors.response.use(
        (response: AxiosResponse) => {
          return response;
        },
        async (error: any) => {
          const originalConfig = error?.config;
          if (
            error?.response?.status === 401 &&
            !originalConfig?._retry &&
            !isRefreshing.current
          ) {
            originalConfig._retry = true;
            try {
              await refresh()
              return apiPrivate(originalConfig);
            } catch (_error: any) {
              originalConfig._retry = false;
              console.log(await _error.JSON());
            }
          } else {
            originalConfig._retry = true;
            return Promise.reject(error);
          }
          return Promise.reject(error);
        }
      )
    }

    function ejectInterceptors() {
      apiPrivate.interceptors.request.eject(reqInterceptorsRef.current);
      apiPrivate.interceptors.response.eject(resInterceptorsRef.current);
    }

    useEffect(() => {
        setupInterceptors()
        return () => ejectInterceptors()
    }, [])

    return {setupInterceptors, ejectInterceptors}
}

export default useAxiosInterceptors
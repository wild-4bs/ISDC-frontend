import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: {
      message: string;
      success?: boolean;
      errorFields?: {
        [key: string]: string[];
      };
    };
  }
}

declare module "axios" {
  export interface AxiosInstance {
    request<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<T>;
    get<T = any, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>;
    delete<T = any, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>;
    head<T = any, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>;
    options<T = any, D = any>(
      url: string,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>;
    post<T = any, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>;
    put<T = any, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>;
    patch<T = any, D = any>(
      url: string,
      data?: D,
      config?: AxiosRequestConfig<D>,
    ): Promise<T>;
  }
}

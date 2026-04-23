import { axiosInstance } from "@/lib/axios";
import { tokenStore } from "@/lib/tokenStore";
import { SuccessResponse } from "@/types/api";
import { User } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";

export interface GetPatientDataResponse {
  id: string;
  cardId: string;
  name: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  role: User["role"];
}

export interface LoginPayload {
  id: string;
}

export const useGetPatientData = () =>
  useQuery({
    queryFn: () =>
      axiosInstance.get<SuccessResponse<GetPatientDataResponse>>(
        `/v1/auth/patient-data`,
      ),
    queryKey: ["patient-data"],
    enabled: !!tokenStore.getAccessToken(),
    retry: false,
    staleTime: 0,
    gcTime: 0,
  });

export interface LoginResponse {
  accessToken: string;
  role: User["role"];
  patient: User;
}

export const useLogin = (
  onSuccess?: (res: SuccessResponse<LoginResponse>) => void,
) =>
  useMutation({
    mutationFn: (data: LoginPayload) =>
      axiosInstance.post<SuccessResponse<LoginResponse>, LoginPayload>(
        `/v1/auth/login`,
        data,
      ),
    onError: (error) => {
      if (error?.errorFields) return;
      console.log(error);
    },
    onSuccess: (res) => {
      onSuccess?.(res);
    },
  });

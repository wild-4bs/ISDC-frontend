export interface Doctor {
  id: string;
  name: string;
  profession: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDoctorPayload {
  name: string;
  profession: string;
  image: string;
}

export interface GetDoctorsParams {
  search?: string;
  page?: number;
  limit?: number;
}

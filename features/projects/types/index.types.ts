export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  imageBefore: string;
  imageAfter: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectPayload {
  title: string;
  category: string;
  description: string;
  imageBefore: string;
  imageAfter: string;
}

export interface GetProjectsParams {
  search?: string;
  page?: number;
  limit?: number;
}

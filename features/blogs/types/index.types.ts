export interface Blog {
  id: string;
  title: string;
  description: string;
  banner: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogPayload {
  title: string;
  description: string;
  banner: string;
  thumbnail: string;
}

export interface GetBlogsParams {
  search?: string;
  page?: number;
  limit?: number;
}

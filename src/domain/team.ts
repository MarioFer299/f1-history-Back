export interface Team {
  id: string;
  name: string;
  base: string;
  championships: number;
  logoUrl: string;
  createdAt: Date;
}

export interface CreateTeamRequest {
  name: string;
  base: string;
  championships: number;
  logoUrl: string;
}

export interface UpdateTeamRequest {
  name?: string;
  base?: string;
  championships?: number;
  logoUrl?: string;
}

export interface PaginatedResponse<T> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: T[];
}
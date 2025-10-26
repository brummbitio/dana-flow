export interface ProjectData {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  category: string;
  target_amount: number;
  current_amount: number;
  backers: number;
  deadline: string | null;
  location: string | null;
  status: string;
  image_url: string | null;
}

export interface ProjectGallery {
  id: number;
  image_url: string;
  caption: string | null;
}

export interface ProjectHighlight {
  id: number;
  title: string;
  description: string;
}

export interface ProjectReturn {
  id: number;
  period: string;
  projection: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  overview: string | null;
  category: string;
  target_amount: number;
  current_amount: number;
  backers: number;
  deadline: string | null;
  location: string | null;
  status: string;
  image_url: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectDetailApiResponse {
  project: ProjectDetail;
  galleries: ProjectGallery[];
  highlights: ProjectHighlight[];
  returns: ProjectReturn[];
}
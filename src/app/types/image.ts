export type Image = {
  file_path: string;
  width: number;
  height: number;
  iso_639_1: string;
  aspect_ratio: number;
  vote_average: number;
  vote_count: number;
};

export type ImageDataTypeObject = {
  backdrops: Image[];
  page: number;
  results: Image[];
  total_pages: number;
  total_results: number;
};

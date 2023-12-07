export type Image = {
  file_path: string;
  vote_average: number;
  vote_count: number;
};

export type ImageDataTypeObject = {
  backdrops: Image[];
};

export interface DataSetType {
  name: string;
  description: string;
  url: string;
  keywords?: string[];
  license?: string;
  creatorName: string;
  creatorUrl?: string;
  datePublished?: string;
  spatialCoverage?: string;
}

export interface RichDatasetProps {
  dataset: DataSetType;
}

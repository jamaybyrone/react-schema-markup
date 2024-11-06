export interface RichDatasetProps {
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

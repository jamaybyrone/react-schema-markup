export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface RichBreadCrumbDataProps {
  supportedLocales?: string[];
  includeTrailingSlash?: boolean;
}

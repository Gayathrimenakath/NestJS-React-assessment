export interface Link {
  id: string;
  name: string;
  url: string;
}

export type MediaType = Document | Photo | Video;
export type DocumentType = "PDF" | "DOC" | "XSL" | "JPG";
export type PhotoType = "PNG" | "JPG";
export type VideoType = "MP4";
export type AssetType = "Document" | "Photo" | "Video";

interface BaseMedia {
  id: string;
  name: string;
  url: string;
}

interface Document extends BaseMedia {
  type: DocumentType;
}

interface Photo extends BaseMedia {
  type: PhotoType;
}

interface Video extends BaseMedia {
  duration: number;
  type: VideoType;
}

export interface CustomField {
  key: string;
  value: string;
}

export interface ProjectDetails {
  id: string;
  status: string;
  bookedDate: string;
  bookingId: string;
  customerRef: string;
  address: string;
  description: string;
  links: Link[];
  documents: Document[];
  photos: Photo[];
  videos: Video[];
  customFields: CustomField[];
}

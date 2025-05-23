export interface Link {
  name: string;
  url: string;
}
export enum DocumentType {
  PDF = 'PDF',
  DOC = 'DOC',
  DOCX = 'DOCX',
  CSV = 'CSV',
}

export enum PhotoType {
  PNG = 'PNG',
  JPG = 'JPG',
}

export enum VideoType {
  MP4 = 'MP4',
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  url: string;
}

export interface Photo {
  id: string;
  name: string;
  type: PhotoType;
  url: string;
}

export interface Video {
  id: string;
  name: string;
  type: VideoType;
  url: string;
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

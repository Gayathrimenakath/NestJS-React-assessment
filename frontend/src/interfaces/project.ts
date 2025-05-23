export interface Link {
  name: string;
  url: string;
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
  //documents: Document[];
  //photos: Photo[];
  //videos: Video[];
  //customFields: CustomField[];
}

import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';

// Enums for media types
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

// Base media class for shared fields
class BaseMedia {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsUrl()
  url: string;
}

// Document DTO
export class Document extends BaseMedia {
  @IsEnum(DocumentType)
  type: DocumentType;
}

// Photo DTO
export class Photo extends BaseMedia {
  @IsEnum(PhotoType)
  type: PhotoType;
}

// Video DTO
export class Video extends BaseMedia {
  @IsNumber()
  duration: number;

  @IsEnum(VideoType)
  type: VideoType;
}

// Link DTO
export class Link {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsUrl()
  url: string;
}

// CustomField DTO
export class CustomField {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

// Main ProjectDetails DTO
export class ProjectDetails {
  @IsString()
  id: string;

  @IsString()
  status: string;

  @IsString()
  bookedDate: string;

  @IsString()
  bookingId: string;

  @IsString()
  customerRef: string;

  @IsString()
  address: string;

  @IsString()
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Link)
  links: Link[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Document)
  documents: Document[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Photo)
  photos: Photo[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Video)
  videos: Video[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CustomField)
  customFields: CustomField[];
}

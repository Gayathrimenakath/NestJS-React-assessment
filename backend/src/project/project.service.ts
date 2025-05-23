import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import {
  DocumentType,
  Link,
  PhotoType,
  ProjectDetails,
  VideoType,
} from './dto/project.dto';

@Injectable()
export class ProjectService {
  private mockProjects: ProjectDetails[] = [
    {
      id: '1',
      status: 'In Progress',
      bookedDate: '12/Oct/21',
      bookingId: '10092',
      customerRef: 'SG10092',
      address: '5 King St, Sydney, NSW',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor pretium pretium. Nulla at lectus eu mauris vulputate ullamcorper sed non libero. Cras vestibulum ornare tempus.',
      links: [
        { name: 'pix4d', url: 'https://pix4d.com' },
        {
          name: 'matterport',
          url: 'https://my.matterport.com/show/?m=YdG9cgxNPGC',
        },
      ],
      documents: [
        {
          id: 'doc1',
          name: 'Building Plan.pdf',
          type: DocumentType.PDF,
          url: '/mock-docs/doc1.pdf',
        },
        {
          id: 'doc2',
          name: 'Survey.jpg',
          type: DocumentType.DOCX,
          url: '/mock-docs/doc2.docx',
        },
        {
          id: 'doc3',
          name: 'Contract.doc',
          type: DocumentType.DOC,
          url: '/mock-docs/doc3.doc',
        },
      ],
      photos: [
        {
          id: 'photo1',
          name: 'Exterior Shot 1.jpg',
          url: '/mock-photos/photo1.jpg',
          type: PhotoType.JPG,
        },
        {
          id: 'photo2',
          name: 'Interior Shot 1.png',
          url: '/mock-photos/photo2.png',
          type: PhotoType.PNG,
        },
      ],
      videos: [
        {
          id: 'video1',
          name: 'Walkthrough.mp4',
          url: '/mock-videos/video1.mp4',
          type: VideoType.MP4,
        },
      ],
      customFields: [
        { key: 'Internal', value: 'TYPE 4' },
        { key: 'External', value: 'Commercial' },
        { key: 'Cat', value: 'No' },
        { key: 'Post', value: 'No' },
      ],
    },
  ];

  getProjectDetails(id: string): ProjectDetails {
    const project = this.mockProjects.find((p) => p.id === id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  addNewLink(projectID: string, createLinkDto: CreateLinkDto): Link {
    const project = this.mockProjects.find((p) => p.id === projectID);

    const newLink: Link = {
      name: createLinkDto.name,
      url: createLinkDto.url,
    };
    project?.links.push(newLink);
    return newLink;
  }
}

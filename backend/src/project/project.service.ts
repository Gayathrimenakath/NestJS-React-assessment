import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectDetails } from './dto/project.dto';

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
    },
  ];

  getProjectDetails(id: string): ProjectDetails {
    const project = this.mockProjects.find((p) => p.id === id);
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }
}

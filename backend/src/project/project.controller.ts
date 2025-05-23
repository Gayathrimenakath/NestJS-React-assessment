import { Controller, Get, Param } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectDetails } from './dto/project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  getProjectDetails(@Param('id') id: string): ProjectDetails {
    return this.projectService.getProjectDetails(id);
  }
}
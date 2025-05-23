import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link, ProjectDetails } from './dto/project.dto';
import { ProjectService } from './project.service';

@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get(':id')
  getProjectDetails(@Param('id') id: string): ProjectDetails {
    return this.projectService.getProjectDetails(id);
  }

  @Post(':id/newLink')
  addNewLink(
    @Param('id') id: string,
    @Body() createLinkDto: CreateLinkDto,
  ): Link {
    return this.projectService.addNewLink(id, createLinkDto);
  }
}

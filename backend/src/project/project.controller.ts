import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { CreateLinkDto } from './dto/create-link.dto';

import { CustomField, Link, ProjectDetails } from './dto/project.dto';
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

  @Post(':id/newCustomField')
  addCustomField(
    @Param('id') id: string,
    @Body() createCustomFieldDto: CreateCustomFieldDto,
  ): CustomField {
    return this.projectService.addCustomField(id, createCustomFieldDto);
  }
}

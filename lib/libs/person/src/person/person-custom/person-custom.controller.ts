import { Locale } from "@hedhog/locale";
import { Role, OptionalParseIntPipe } from "@hedhog/utils";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { PersonCustomService } from "./person-custom.service";
import { CreateDTO } from "./dto/create.dto";
import { UpdateDTO } from "./dto/update.dto";

@Role()
@Controller("person/:personId/custom")
export class PersonCustomController {
  constructor(private readonly customService: PersonCustomService) {}
  @Post()
  create(
    @Param("personId", ParseIntPipe) personId: number,
    @Body() data: CreateDTO,
  ) {
    return this.customService.create(personId, data);
  }

  @Get()
  list(
    @Param("personId", ParseIntPipe) personId: number,
    @Query("typeId", OptionalParseIntPipe) typeId?: number,
    @Query("id", OptionalParseIntPipe) customId?: number,
  ) {
    if (customId) {
      return this.customService.list(personId, null, customId);
    }
    if (typeId) {
      return this.customService.list(personId, typeId);
    }
    return this.customService.list(personId);
  }

  @Patch(":customId")
  update(@Param("customId", ParseIntPipe) id: number, @Body() data: UpdateDTO) {
    return this.customService.update(id, data);
  }

  @Delete(":customId")
  delete(@Param("customId", ParseIntPipe) customId: number) {
    return this.customService.delete(customId);
  }
}

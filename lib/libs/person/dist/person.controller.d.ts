import { CreatePersonDTO } from './dto/create-person.dto';
import { DeleteDTO } from './dto/delete.dto';
import { UpdatePersonDTO } from './dto/update-person.dto';
import { PersonService } from './person.service';
export declare class PersonController {
    private readonly personService;
    constructor(personService: PersonService);
    create(data: CreatePersonDTO): Promise<any>;
    list(paginationParams: any, locale: any): Promise<import("@hedhog/pagination").PaginatedResult<unknown>>;
    get(id: number): Promise<any>;
    update(id: number, data: UpdatePersonDTO): Promise<any>;
    delete(data: DeleteDTO): Promise<any>;
}
//# sourceMappingURL=person.controller.d.ts.map
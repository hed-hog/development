import { PaginationParams } from "@/types";
import { Category } from "@/types/models";
export declare function requests(): {
    categoryCreate: (data: Category) => Promise<any>;
    categoryUpdate: (id: number, data: Category) => Promise<any>;
    categoryDelete: (ids: number[]) => Promise<any>;
    categoryList: (params: PaginationParams) => Promise<any>;
    categoryGet: (id: number) => Promise<any>;
};
//# sourceMappingURL=requests.d.ts.map
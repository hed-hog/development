import { PaginationParams } from "@/types";
import { Author } from "@/types/models";
export declare function requests(): {
    authorCreate: (data: Author) => Promise<any>;
    authorUpdate: (id: number, data: Author) => Promise<any>;
    authorDelete: (ids: number[]) => Promise<any>;
    authorList: (params: PaginationParams) => Promise<any>;
    authorGet: (id: number) => Promise<any>;
};
//# sourceMappingURL=requests.d.ts.map
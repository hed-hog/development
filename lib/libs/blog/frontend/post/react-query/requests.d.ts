import { PaginationParams } from "@/types";
import { Post } from "@/types/models";
export declare function requests(): {
    postCreate: (data: Post) => Promise<any>;
    postUpdate: (id: number, data: Post) => Promise<any>;
    postDelete: (ids: number[]) => Promise<any>;
    postList: (params: PaginationParams) => Promise<any>;
    postGet: (id: number) => Promise<any>;
};
//# sourceMappingURL=requests.d.ts.map
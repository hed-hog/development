"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCategoryCreate = useCategoryCreate;
exports.useCategoryDelete = useCategoryDelete;
exports.useCategoryUpdate = useCategoryUpdate;
exports.useCategoryGet = useCategoryGet;
const use_default_mutation_1 = require("@/hooks/use-default-mutation");
const react_query_1 = require("@tanstack/react-query");
const requests_1 = require("./requests");
const scope = "category";
function useCategoryCreate() {
    const { categoryCreate } = (0, requests_1.requests)();
    return (0, use_default_mutation_1.useDefaultMutation)(scope, "create", categoryCreate);
}
function useCategoryDelete() {
    const { categoryDelete } = (0, requests_1.requests)();
    return (0, use_default_mutation_1.useDefaultMutation)(scope, "delete", categoryDelete);
}
function useCategoryUpdate() {
    const { categoryUpdate } = (0, requests_1.requests)();
    return (0, use_default_mutation_1.useDefaultMutation)(scope, "update", categoryUpdate);
}
function useCategoryGet(id) {
    const { categoryGet } = (0, requests_1.requests)();
    return (0, react_query_1.useQuery)({
        queryKey: [scope, "get"],
        queryFn: () => categoryGet(id),
    });
}
//# sourceMappingURL=handlers.js.map
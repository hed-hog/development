"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAuthorCreate = useAuthorCreate;
exports.useAuthorDelete = useAuthorDelete;
exports.useAuthorUpdate = useAuthorUpdate;
exports.useAuthorGet = useAuthorGet;
const use_default_mutation_1 = require("@/hooks/use-default-mutation");
const react_query_1 = require("@tanstack/react-query");
const requests_1 = require("./requests");
const scope = "author";
function useAuthorCreate() {
    const { authorCreate } = (0, requests_1.requests)();
    return (0, use_default_mutation_1.useDefaultMutation)(scope, "create", authorCreate);
}
function useAuthorDelete() {
    const { authorDelete } = (0, requests_1.requests)();
    return (0, use_default_mutation_1.useDefaultMutation)(scope, "delete", authorDelete);
}
function useAuthorUpdate() {
    const { authorUpdate } = (0, requests_1.requests)();
    return (0, use_default_mutation_1.useDefaultMutation)(scope, "update", authorUpdate);
}
function useAuthorGet(id) {
    const { authorGet } = (0, requests_1.requests)();
    return (0, react_query_1.useQuery)({
        queryKey: [scope, "get"],
        queryFn: () => authorGet(id),
    });
}
//# sourceMappingURL=handlers.js.map
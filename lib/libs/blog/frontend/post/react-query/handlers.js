"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePostCreate = usePostCreate;
exports.usePostDelete = usePostDelete;
exports.usePostUpdate = usePostUpdate;
exports.usePostGet = usePostGet;
const use_default_mutation_1 = require("@/hooks/use-default-mutation");
const react_query_1 = require("@tanstack/react-query");
const requests_1 = require("./requests");
const scope = "post";
function usePostCreate() {
    const { postCreate } = (0, requests_1.requests)();
    return (0, use_default_mutation_1.useDefaultMutation)(scope, "create", postCreate);
}
function usePostDelete() {
    const { postDelete } = (0, requests_1.requests)();
    return (0, use_default_mutation_1.useDefaultMutation)(scope, "delete", postDelete);
}
function usePostUpdate() {
    const { postUpdate } = (0, requests_1.requests)();
    return (0, use_default_mutation_1.useDefaultMutation)(scope, "update", postUpdate);
}
function usePostGet(id) {
    const { postGet } = (0, requests_1.requests)();
    return (0, react_query_1.useQuery)({
        queryKey: [scope, "get"],
        queryFn: () => postGet(id),
    });
}
//# sourceMappingURL=handlers.js.map
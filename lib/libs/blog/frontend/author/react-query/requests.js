"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requests = requests;
const use_app_1 = require("@/hooks/use-app");
const http_method_1 = require("@/types/http-method");
function requests() {
    const { request } = (0, use_app_1.useApp)();
    const authorList = async (params) => {
        return request({
            url: "/author",
            params,
        });
    };
    const authorGet = async (id) => {
        return request({
            url: `/author/${id}`,
        });
    };
    const authorCreate = async (data) => {
        return request({
            url: "/author",
            method: http_method_1.HttpMethod.POST,
            data: data,
        });
    };
    const authorDelete = async (ids) => {
        return request({
            url: "/author",
            data: { ids },
            method: http_method_1.HttpMethod.DELETE,
        });
    };
    const authorUpdate = async (id, data) => {
        return request({
            url: `/author/${id}`,
            method: http_method_1.HttpMethod.PATCH,
            data: data,
        });
    };
    return {
        authorCreate,
        authorUpdate,
        authorDelete,
        authorList,
        authorGet,
    };
}
//# sourceMappingURL=requests.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requests = requests;
const use_app_1 = require("@/hooks/use-app");
const http_method_1 = require("@/types/http-method");
function requests() {
    const { request } = (0, use_app_1.useApp)();
    const postList = async (params) => {
        return request({
            url: "/post",
            params,
        });
    };
    const postGet = async (id) => {
        return request({
            url: `/post/${id}`,
        });
    };
    const postCreate = async (data) => {
        return request({
            url: "/post",
            method: http_method_1.HttpMethod.POST,
            data: data,
        });
    };
    const postDelete = async (ids) => {
        return request({
            url: "/post",
            data: { ids },
            method: http_method_1.HttpMethod.DELETE,
        });
    };
    const postUpdate = async (id, data) => {
        return request({
            url: `/post/${id}`,
            method: http_method_1.HttpMethod.PATCH,
            data: data,
        });
    };
    return {
        postCreate,
        postUpdate,
        postDelete,
        postList,
        postGet,
    };
}
//# sourceMappingURL=requests.js.map
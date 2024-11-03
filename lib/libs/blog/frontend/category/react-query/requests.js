"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requests = requests;
const use_app_1 = require("@/hooks/use-app");
const http_method_1 = require("@/types/http-method");
const utils_1 = require("@hedhog/utils");
function requests() {
    const { request } = (0, use_app_1.useApp)();
    const categoryList = async (params) => {
        return request({
            url: "/category",
            params,
        });
    };
    const categoryGet = async (id) => {
        return request({
            url: `/category/${id}`,
        });
    };
    const categoryCreate = async (data) => {
        return request({
            url: "/category",
            method: http_method_1.HttpMethod.POST,
            data: (0, utils_1.formatDataWithLocale)(data),
        });
    };
    const categoryDelete = async (ids) => {
        return request({
            url: "/category",
            data: { ids },
            method: http_method_1.HttpMethod.DELETE,
        });
    };
    const categoryUpdate = async (id, data) => {
        return request({
            url: `/category/${id}`,
            method: http_method_1.HttpMethod.PATCH,
            data: (0, utils_1.formatDataWithLocale)(data),
        });
    };
    return {
        categoryCreate,
        categoryUpdate,
        categoryDelete,
        categoryList,
        categoryGet,
    };
}
//# sourceMappingURL=requests.js.map
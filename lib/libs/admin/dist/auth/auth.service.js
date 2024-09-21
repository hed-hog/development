"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_1 = require("@hedhog/prisma");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_1 = require("bcrypt");
const multifactor_type_enum_1 = require("./enums/multifactor-type.enum");
const mail_1 = require("@hedhog/mail");
let AuthService = class AuthService {
    constructor(prisma, jwt, mail) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.mail = mail;
    }
    async verifyToken(token) {
        return this.jwt.verifyAsync(token, {
            secret: String(process.env.JWT_SECRET),
        });
    }
    generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }
        return result;
    }
    generateRandomNumber() {
        const min = 100000;
        const max = 999999;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    async loginWithEmailAndPassword(email, password) {
        const user = await this.prisma.users.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await (0, bcrypt_1.compare)(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.NotFoundException('Invalid password');
        }
        if (!user.multifactor_id) {
            return this.getToken(user);
        }
        else {
            if (user.multifactor_id === multifactor_type_enum_1.MultifactorType.EMAIL) {
                const code = this.generateRandomNumber();
                await this.prisma.users.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        code: String(code),
                    },
                });
                await this.mail.send({
                    to: user.email,
                    subject: 'Login code',
                    body: `Your login code is ${code}`,
                });
            }
            return {
                token: this.jwt.sign({
                    id: user.id,
                    mfa: user.multifactor_id,
                }),
                mfa: true,
            };
        }
    }
    async getToken(user) {
        delete user.password;
        const payload = { user };
        return {
            token: this.jwt.sign(payload),
        };
    }
    async forget({ email }) {
        const user = await this.prisma.users.findFirst({
            where: {
                email,
            },
            select: {
                id: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const code = this.generateRandomString(32);
        await this.prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                code,
            },
        });
        await this.mail.send({
            to: email,
            subject: 'Reset password',
            body: `Reset your password by clicking <a href="${process.env.FRONTEND_URL}/reset-password/${code}">here</a>`,
        });
        return true;
    }
    async otp({ token, code }) {
        const data = this.jwt.decode(token);
        const user = await this.prisma.users.findFirst({
            where: {
                id: data['id'],
                code: String(code),
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('Invalid code');
        }
        await this.prisma.users.update({
            where: {
                id: user.id,
            },
            data: {
                code: null,
            },
        });
        return this.getToken(user);
    }
    login({ email, password }) {
        return this.loginWithEmailAndPassword(email, password);
    }
    verify(id) {
        return this.prisma.users.findUnique({ where: { id } });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => prisma_1.PrismaService))),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => jwt_1.JwtService))),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => mail_1.MailService))),
    __metadata("design:paramtypes", [prisma_1.PrismaService,
        jwt_1.JwtService,
        mail_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
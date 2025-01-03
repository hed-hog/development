// import { MailService } from '@hedhog/mail';
// import { PrismaService } from '@hedhog/prisma';
// import { NotFoundException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Test, TestingModule } from '@nestjs/testing';
// import { compare } from 'bcrypt';
// import { AuthService } from './auth.service';

// jest.mock('bcrypt');

// describe('AuthService', () => {
//   let authService: AuthService;
//   let prismaService: PrismaService;
//   let jwtService: JwtService;
//   let mailService: MailService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         {
//           provide: PrismaService,
//           useValue: {
//             user: {
//               findFirst: jest.fn(),
//               update: jest.fn(),
//               findUnique: jest.fn(),
//             },
//           },
//         },
//         {
//           provide: JwtService,
//           useValue: {
//             sign: jest.fn(),
//             verifyAsync: jest.fn(),
//             decode: jest.fn(),
//           },
//         },
//         {
//           provide: MailService,
//           useValue: {
//             send: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     authService = module.get<AuthService>(AuthService);
//     prismaService = module.get<PrismaService>(PrismaService);
//     jwtService = module.get<JwtService>(JwtService);
//     mailService = module.get<MailService>(MailService);
//   });

//   it('should be defined', () => {
//     expect(authService).toBeDefined();
//   });

//   describe('loginWithEmailAndPassword', () => {
//     it('should throw NotFoundException if user is not found', async () => {
//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

//       await expect(
//         authService.loginWithEmailAndPassword('test@example.com', 'password'),
//       ).rejects.toThrow(NotFoundException);
//     });

//     it('should throw NotFoundException if password is invalid', async () => {
//       const mockUser = {
//         id: 1,
//         name: 'Test User',
//         email: 'test@example.com',
//         password: 'hashedpassword',
//         multifactor_id: null,
//         code: null,
//         created_at: new Date(),
//         updated_at: new Date(),
//       };
//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);
//       (compare as jest.Mock).mockResolvedValue(false);

//       await expect(
//         authService.loginWithEmailAndPassword('test@example.com', 'password'),
//       ).rejects.toThrow(NotFoundException);
//     });

//     it('should return a token if login is successful', async () => {
//       const mockUser = {
//         id: 1,
//         name: 'Test User',
//         email: 'test@example.com',
//         password: 'hashedpassword',
//         multifactor_id: null,
//         code: null,
//         created_at: new Date(),
//         updated_at: new Date(),
//       };
//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);
//       (compare as jest.Mock).mockResolvedValue(true);
//       jest.spyOn(jwtService, 'sign').mockReturnValue('token');

//       const result = await authService.loginWithEmailAndPassword(
//         'test@example.com',
//         'password',
//       );

//       expect(result).toEqual({ token: 'token' });
//     });
//   });

//   describe('forget', () => {
//     it('should throw NotFoundException if user is not found', async () => {
//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

//       await expect(
//         authService.forget({ email: 'test@example.com' }),
//       ).rejects.toThrow(NotFoundException);
//     });

//     it('should update user with reset code and send email', async () => {
//       const mockUser = {
//         id: 1,
//         name: 'Test User',
//         email: 'test@example.com',
//         password: 'hashedpassword',
//         multifactor_id: null,
//         code: null,
//         created_at: new Date(),
//         updated_at: new Date(),
//       };
//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);
//       jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);
//       jest
//         .spyOn(authService, 'generateRandomString')
//         .mockReturnValue('resetCode');

//       const result = await authService.forget({ email: 'test@example.com' });

//       expect(prismaService.user.update).toHaveBeenCalledWith({
//         where: { id: 1 },
//         data: { code: 'resetCode' },
//       });
//       expect(mailService.send).toHaveBeenCalledWith({
//         to: 'test@example.com',
//         subject: 'Reset password',
//         body: `Reset your password by clicking <a href="${process.env.FRONTEND_URL}/reset-password/resetCode">here</a>`,
//       });
//       expect(result).toEqual(true);
//     });
//   });

//   describe('otp', () => {
//     it('should throw NotFoundException if user with code is not found', async () => {
//       jest.spyOn(jwtService, 'decode').mockReturnValue({ id: 1 });
//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);

//       await expect(
//         authService.otp({ token: 'token', code: 123456 }),
//       ).rejects.toThrow(NotFoundException);
//     });

//     it('should return a token if otp is valid', async () => {
//       const mockUser = {
//         id: 1,
//         name: 'Test User',
//         email: 'test@example.com',
//         password: 'hashedpassword',
//         multifactor_id: null,
//         code: null,
//         created_at: new Date(),
//         updated_at: new Date(),
//       };
//       jest.spyOn(jwtService, 'decode').mockReturnValue({ id: 1 });
//       jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(mockUser);
//       jest.spyOn(prismaService.user, 'update').mockResolvedValue(mockUser);
//       jest.spyOn(jwtService, 'sign').mockReturnValue('newToken');

//       const result = await authService.otp({ token: 'token', code: 123456 });

//       expect(prismaService.user.update).toHaveBeenCalledWith({
//         where: { id: 1 },
//         data: { code: null },
//       });
//       expect(result).toEqual({ token: 'newToken' });
//     });
//   });

//   describe('verifyToken', () => {
//     it('should verify and return token data', async () => {
//       jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue({ id: 1 });

//       const result = await authService.verifyToken('token');

//       expect(result).toEqual({ id: 1 });
//     });
//   });
// });

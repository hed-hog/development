import { HttpService } from '@nestjs/axios';
import { AbstractProvider } from './abstract.provider';
import { EnumProvider } from './provider.enum';
export declare class ProviderFactory {
    static create(providerType: EnumProvider, prividerId: number, setting: Record<string, string>, httpService: HttpService): AbstractProvider;
}
//# sourceMappingURL=provider.factory.d.ts.map
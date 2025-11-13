import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 27.
    const request = context.switchToHttp().getRequest();
    const apiKey = request.header('X-API-KEY'); // Checking headers

    if (apiKey !== 'nest-js') {
      return false;
    }
    return true;
  }
}

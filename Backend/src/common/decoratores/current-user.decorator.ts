// 44. creating currect decorator

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    if (!data) return req.user;
    return req.user?.[data];
  },
);

// @Get('me')
// getMe(@CurrentUser() user: User) { if current user is called like this then it return ths object
//   return user;
// }

// @Get('me-id')
// getId(@CurrentUser('id') id: string) { //if sent the field id then it returns the id current logged in user
//   return id;
// }

//ExcutionContext gives access to req, res and route handlers
// which then allows ctx.switchToHttp().getRequest() to get express req object

import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { compact, uniq } from 'lodash';

export const getIds = createParamDecorator((data, ctx: ExecutionContext) => {
  const key = data || 'ids';
  const request = ctx.switchToHttp().getRequest();
  const ids = request.query[key];

  return uniq(compact(ids.split(',')));
});

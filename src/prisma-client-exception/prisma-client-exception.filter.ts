import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { BaseExceptionFilter } from '@nestjs/core';

// Catch all exceptions and handle Prisma errors explicitly.
@Catch()
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  constructor(private readonly httpAdapterHostInternal: HttpAdapterHost) {
    // Pass the adapter to the base filter so `super.catch` works
    super(httpAdapterHostInternal?.httpAdapter);
  }

  catch(exception: any, host: ArgumentsHost) {
    // Log for debugging
    console.error('Global exception caught by PrismaClientExceptionFilter:', exception?.message ?? exception);

    const { httpAdapter } = this.httpAdapterHostInternal;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();


    // Detect http exeption errors
       if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      const message =
        typeof res === 'string'
          ? res
          : (res as any)?.message ?? 'Error';

      httpAdapter.reply(
        response,
        {
          status,
          message,
        },
        status,
      );
      return;
    }

    // Detect Prisma errors either by instanceof or by checking constructor name
    const isKnownRequestError = exception instanceof Prisma.PrismaClientKnownRequestError || exception?.name === 'PrismaClientKnownRequestError';
    const isUnknownRequestError = exception instanceof Prisma.PrismaClientUnknownRequestError || exception?.name === 'PrismaClientUnknownRequestError';
    const isRustPanic = exception instanceof Prisma.PrismaClientRustPanicError || exception?.name === 'PrismaClientRustPanicError';
    const isValidationError = exception instanceof Prisma.PrismaClientValidationError || exception?.name === 'PrismaClientValidationError';

    if (isKnownRequestError) {
      // Map specific Prisma error codes to HTTP statuses and customizable messages.
      const statusByCode: Record<string, number> = {
        P2002: HttpStatus.CONFLICT,
        P2025: HttpStatus.NOT_FOUND,
      };

      const messageTemplates: Record<string, string | ((e: any) => string)> = {
        P2002: (e: any) => {
          // e.meta.target usually contains the field(s) that caused the unique constraint
          const target = e?.meta?.target;
          const fields = Array.isArray(target) ? target.join(', ') : (target ?? 'campo');
          return `El valor ya existe para: ${fields}.`;
        },
        P2025: (e: any) => {
          // Not found error. Prisma sometimes includes cause/details in meta.
          const cause = e?.meta?.cause ?? e?.meta?.details ?? '';
          return `Registro no encontrado.${cause ? ' ' + cause : ''}`;
        },
      };

      const formatMessage = (code: string, e: any) => {
        const tmpl = messageTemplates[code];
        if (!tmpl) return (e?.message ?? 'Prisma error').toString().replace(/\n/g, '');
        return typeof tmpl === 'function' ? tmpl(e) : tmpl;
      };

      const status = statusByCode[exception.code] ?? HttpStatus.BAD_REQUEST;
      const message = formatMessage(exception.code, exception);
      httpAdapter.reply(response, { status: status, message }, status);
      return;
    }

    if (isValidationError) {
      const status = HttpStatus.BAD_REQUEST;
      const message = (exception.message ?? '').toString().replace(/\n/g, '');
      httpAdapter.reply(response, { status: status, message }, status);
      return;
    }

    if (isRustPanic || isUnknownRequestError) {
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      const message = 'Internal database error';
      httpAdapter.reply(response, { status: status, message }, status);
      return;
    }

    // Not a Prisma error -> fallback to default behavior
    super.catch(exception, host);
  }
}



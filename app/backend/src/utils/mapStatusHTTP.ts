export default function mapStatusHTTP(status: string): number {
    switch (status) {
      case 'UNAUTHORIZED':
        return 401;
      case 'SUCCESSFUL':
        return 200;
      case 'INVALID_DATA':
        return 400;
      case 'NOT_FOUND':
        return 404;
      case 'CONFLICT':
        return 409;
      case 'UNPROCESSABLE_ENTITY':
        return 422;
      case 'CREATED':
        return 201;
      default:
        return 500;
    }
  }
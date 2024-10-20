export const SUCCESS_CODES = {
    CREATED: {
        code: 'CREATED',
        statusCode: 201,
        message: `Your data is stored`,
    },
    UPDATED: {
        code: 'UPDATED',
        statusCode: 200,
        message: `Your data is updated`,
    },
    DELETED: {
        code: 'DELETED',
        statusCode: 200,
        message: `Your data is deleted`,
    },
    READ: {
        code: 'READ',
        statusCode: 200,
        message: `Data fetched successfully`,
    },
    ACCEPTED: {
        code: 'ACCEPTED',
        statusCode: 202,
        message: `Your request is accepted`,
    },
} as const;

export const ERROR_CODES = {
    PATH_NOT_FOUND: {
        code: 'PATH_NOT_FOUND',
        statusCode: 404,
        message: `This path does not exist.`,
    },
    BAD_REQUEST: {
        code: 'BAD_REQUEST',
        statusCode: 400,
        message: `Invalid input`,
    },
    UNAUTHORIZED: {
        code: 'UNAUTHORIZED',
        statusCode: 401,
        message: `Unauthorized access`,
    },
    PAYMENT_REQUIRED: {
        code: 'PAYMENT_REQUIRED',
        statusCode: 402,
        message: `Payment Required`,
    },
    FORBIDDEN: {
        code: 'FORBIDDEN',
        statusCode: 403,
        message: `Forbidden`,
    },
    NOT_FOUND: {
        code: 'NOT_FOUND',
        statusCode: 404,
        message: `Not Found`,
    },
    METHOD_NOT_ALLOWED: {
        code: 'METHOD_NOT_ALLOWED',
        statusCode: 405,
        message: `Method Not Allowed`,
    },
    NOT_ACCEPTABLE: {
        code: 'NOT_ACCEPTABLE',
        statusCode: 406,
        message: `Not Acceptable`,
    },
    REQUEST_TIMEOUT: {
        code: 'REQUEST_TIMEOUT',
        statusCode: 408,
        message: `Request Timeout`,
    },
    UNSUPPORTED_MEDIA_TYPE: {
        code: 'UNSUPPORTED_MEDIA_TYPE',
        statusCode: 415,
        message: `Unsupported Media Type`,
    },
    INTERNAL_SERVER: {
        code: 'INTERNAL_SERVER',
        statusCode: 500,
        message: `An unexpected error occurred`,
    },
    NOT_IMPLEMENTED: {
        code: 'NOT_IMPLEMENTED',
        statusCode: 501,
        message: `Not Implemented`,
    },
    BAD_GATEWAY: {
        code: 'BAD_GATEWAY',
        statusCode: 502,
        message: `Bad Gateway`,
    },
    SERVICE_UNAVAILABLE: {
        code: 'SERVICE_UNAVAILABLE',
        statusCode: 503,
        message: `Service Unavailable`,
    },
    GATEWAY_TIMEOUT: {
        code: 'GATEWAY_TIMEOUT',
        statusCode: 504,
        message: `Gateway Timeout`,
    },
    // Add more error codes as needed
} as const;

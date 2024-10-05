import { HttpContext } from "@adonisjs/core/http"

export default class ResponseHandler {

    /**
     * Success Response
     * @param response AdonisJS Response object
     * @param data The data to return
     * @param message Optional message
     */
    public static success({ response }: HttpContext, data = {}, message = 'Success') {
        return response.status(200).json({
            status: 'success',
            message,
            data
        })
    }

    /**
     * Created Response (201)
     * @param response AdonisJS Response object
     * @param data The data to return
     * @param message Optional message
     */
    public static created({ response }: HttpContext, data = {}, message = 'Created successfully') {
        return response.status(201).json({
            status: 'success',
            message,
            data
        })
    }

    /**
     * Error Response
     * @param response AdonisJS Response object
     * @param message Error message
     * @param code HTTP status code, default is 400
     */
    public static error({ response }: HttpContext, message = 'An error occurred', code = 400) {
        return response.status(code).json({
            status: 'error',
            message,
            data: null
        })
    }

    /**
     * Not Found Response (404)
     * @param response AdonisJS Response object
     * @param message Optional message
     */
    public static notFound({ response }: HttpContext, message = 'Resource not found') {
        return response.status(404).json({
            status: 'error',
            message,
            data: null
        })
    }

    /**
     * Validation Failure Response (422)
     * @param response AdonisJS Response object
     * @param errors Validation error details
     */
    public static validationFailed({ response }: HttpContext, errors = []) {
        return response.status(422).json({
            status: 'error',
            message: 'Validation failed',
            errors
        })
    }
}

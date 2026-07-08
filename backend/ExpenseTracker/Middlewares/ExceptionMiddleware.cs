using System.Net;
using System.Text.Json;

namespace ExpenseTracker.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";

            var statusCode = exception.Message switch
            {
                "Invalid email or password." => (int)HttpStatusCode.Unauthorized,
                "Email already exists." => (int)HttpStatusCode.BadRequest,
                "Amount must be greater than zero." => (int)HttpStatusCode.BadRequest,
                "Transaction not found." => (int)HttpStatusCode.NotFound,
                "User not found." => (int)HttpStatusCode.NotFound,
                "User id not found in token." => (int)HttpStatusCode.Unauthorized,
                _ => (int)HttpStatusCode.InternalServerError
            };

            context.Response.StatusCode = statusCode;

            var response = new
            {
                statusCode,
                message = exception.Message
            };

            var json = JsonSerializer.Serialize(response);

            await context.Response.WriteAsync(json);
        }
    }
}
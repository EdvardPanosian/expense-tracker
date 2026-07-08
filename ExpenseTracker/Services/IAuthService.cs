using ExpenseTracker.DTOs;

namespace ExpenseTracker.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDto> RegisterAsync(RegisterDto dto);

        Task<AuthResponseDto> LoginAsync(LoginDto dto);

        Task<UserProfileDto> GetCurrentUserAsync(int userId);
    }
}
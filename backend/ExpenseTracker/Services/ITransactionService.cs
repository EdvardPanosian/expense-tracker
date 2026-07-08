using ExpenseTracker.DTOs;

namespace ExpenseTracker.Services
{
    public interface ITransactionService
    {
        Task<TransactionDto> CreateAsync(int userId, CreateTransactionDto dto);

        Task<List<TransactionDto>> GetAllAsync(int userId, TransactionFilterDto filter);

        Task<BalanceDto> GetBalanceAsync(int userId);

        Task<TransactionDto> UpdateAsync(int userId, int transactionId, UpdateTransactionDto dto);

        Task DeleteAsync(int userId, int transactionId);

        Task<List<CategoryExpenseDto>> GetExpensesByCategoryAsync(int userId);
    }
}
using ExpenseTracker.Data;
using ExpenseTracker.DTOs;
using ExpenseTracker.Models;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTracker.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly AppDbContext _context;

        public TransactionService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TransactionDto> CreateAsync(int userId, CreateTransactionDto dto)
        {
            if (dto.Amount <= 0)
            {
                throw new Exception("Amount must be greater than zero.");
            }

            var transaction = new Transaction
            {
                Title = dto.Title,
                Amount = dto.Amount,
                Type = dto.Type,
                Category = dto.Category,
                Date = dto.Date,
                Description = dto.Description,
                UserId = userId
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return MapToDto(transaction);
        }

        public async Task<List<TransactionDto>> GetAllAsync(int userId, TransactionFilterDto filter)
        {
            var query = _context.Transactions
                .Where(t => t.UserId == userId)
                .AsQueryable();

            if (filter.Type.HasValue)
            {
                query = query.Where(t => t.Type == filter.Type.Value);
            }

            if (filter.From.HasValue)
            {
                query = query.Where(t => t.Date >= filter.From.Value.Date);
            }

            if (filter.To.HasValue)
            {
                var toDateExclusive = filter.To.Value.Date.AddDays(1);

                query = query.Where(t => t.Date < toDateExclusive);
            }

            return await query
                .OrderByDescending(t => t.Date)
                .Select(t => new TransactionDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Amount = t.Amount,
                    Type = t.Type,
                    Category = t.Category,
                    Date = t.Date,
                    Description = t.Description
                })
                .ToListAsync();
        }

        public async Task<BalanceDto> GetBalanceAsync(int userId)
        {
            var totalIncome = await _context.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Income)
                .SumAsync(t => t.Amount);

            var totalExpense = await _context.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Expense)
                .SumAsync(t => t.Amount);

            return new BalanceDto
            {
                TotalIncome = totalIncome,
                TotalExpense = totalExpense,
                Balance = totalIncome - totalExpense
            };
        }

        public async Task<TransactionDto> UpdateAsync(int userId, int transactionId, UpdateTransactionDto dto)
        {
            if (dto.Amount <= 0)
            {
                throw new Exception("Amount must be greater than zero.");
            }

            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == transactionId && t.UserId == userId);

            if (transaction == null)
            {
                throw new Exception("Transaction not found.");
            }

            transaction.Title = dto.Title;
            transaction.Amount = dto.Amount;
            transaction.Type = dto.Type;
            transaction.Category = dto.Category;
            transaction.Date = dto.Date;
            transaction.Description = dto.Description;

            await _context.SaveChangesAsync();

            return MapToDto(transaction);
        }

        public async Task DeleteAsync(int userId, int transactionId)
        {
            var transaction = await _context.Transactions
                .FirstOrDefaultAsync(t => t.Id == transactionId && t.UserId == userId);

            if (transaction == null)
            {
                throw new Exception("Transaction not found.");
            }

            _context.Transactions.Remove(transaction);

            await _context.SaveChangesAsync();
        }

        public async Task<List<CategoryExpenseDto>> GetExpensesByCategoryAsync(int userId)
        {
            var totalExpense = await _context.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Expense)
                .SumAsync(t => t.Amount);

            if (totalExpense == 0)
            {
                return new List<CategoryExpenseDto>();
            }

            var result = await _context.Transactions
                .Where(t => t.UserId == userId && t.Type == TransactionType.Expense)
                .GroupBy(t => t.Category)
                .Select(g => new CategoryExpenseDto
                {
                    Category = g.Key,
                    TotalAmount = g.Sum(t => t.Amount),
                    Percentage = Math.Round(g.Sum(t => t.Amount) * 100 / totalExpense, 2)
                })
                .OrderByDescending(x => x.TotalAmount)
                .ToListAsync();

            return result;
        }

        private TransactionDto MapToDto(Transaction transaction)
        {
            return new TransactionDto
            {
                Id = transaction.Id,
                Title = transaction.Title,
                Amount = transaction.Amount,
                Type = transaction.Type,
                Category = transaction.Category,
                Date = transaction.Date,
                Description = transaction.Description
            };
        }
    }
}
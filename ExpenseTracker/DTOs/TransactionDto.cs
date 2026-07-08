using ExpenseTracker.Models;

namespace ExpenseTracker.DTOs
{
    public class TransactionDto
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public decimal Amount { get; set; }

        public TransactionType Type { get; set; }

        public string Category { get; set; } = string.Empty;

        public DateTime Date { get; set; }

        public string? Description { get; set; }
    }
}
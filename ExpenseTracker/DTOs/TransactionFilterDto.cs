using ExpenseTracker.Models;

namespace ExpenseTracker.DTOs
{
    public class TransactionFilterDto
    {
        public TransactionType? Type { get; set; }

        public DateTime? From { get; set; }

        public DateTime? To { get; set; }
    }
}
using ExpenseTracker.Models;
using System.ComponentModel.DataAnnotations;

namespace ExpenseTracker.DTOs
{
    public class UpdateTransactionDto
    {
        [Required]
        [MinLength(2)]
        [MaxLength(100)]
        public string Title { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
        public decimal Amount { get; set; }

        [Required]
        [EnumDataType(typeof(TransactionType))]
        public TransactionType Type { get; set; }

        [Required]
        [MinLength(2)]
        [MaxLength(50)]
        public string Category { get; set; } = string.Empty;

        public DateTime Date { get; set; } = DateTime.Now;

        [MaxLength(300)]
        public string? Description { get; set; }
    }
}
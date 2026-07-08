using System.Transactions;

namespace ExpenseTracker.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public List<Transaction> Transactions { get; set; } = new();
    }
}

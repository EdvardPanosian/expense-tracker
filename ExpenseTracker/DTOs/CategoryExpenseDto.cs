namespace ExpenseTracker.DTOs
{
    public class CategoryExpenseDto
    {
        public string Category { get; set; } = string.Empty;

        public decimal TotalAmount { get; set; }

        public decimal Percentage { get; set; }
    }
}
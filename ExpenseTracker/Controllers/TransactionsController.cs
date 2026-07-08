using ExpenseTracker.DTOs;
using ExpenseTracker.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ExpenseTracker.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TransactionsController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionsController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpPost]
        public async Task<ActionResult<TransactionDto>> Create(CreateTransactionDto dto)
        {
            var userId = GetUserId();

            var result = await _transactionService.CreateAsync(userId, dto);

            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<List<TransactionDto>>> GetAll([FromQuery] TransactionFilterDto filter)
        {
            var userId = GetUserId();

            var result = await _transactionService.GetAllAsync(userId, filter);

            return Ok(result);
        }

        [HttpGet("balance")]
        public async Task<ActionResult<BalanceDto>> GetBalance()
        {
            var userId = GetUserId();

            var result = await _transactionService.GetBalanceAsync(userId);

            return Ok(result);
        }

        [HttpGet("expenses-by-category")]
        public async Task<ActionResult<List<CategoryExpenseDto>>> GetExpensesByCategory()
        {
            var userId = GetUserId();

            var result = await _transactionService.GetExpensesByCategoryAsync(userId);

            return Ok(result);
        }

        [HttpPut("{id:int}")]
        public async Task<ActionResult<TransactionDto>> Update(int id, UpdateTransactionDto dto)
        {
            var userId = GetUserId();

            var result = await _transactionService.UpdateAsync(userId, id, dto);

            return Ok(result);
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var userId = GetUserId();

            await _transactionService.DeleteAsync(userId, id);

            return NoContent();
        }

        private int GetUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (userIdClaim == null)
            {
                throw new Exception("User id not found in token.");
            }

            return int.Parse(userIdClaim);
        }
    }
}
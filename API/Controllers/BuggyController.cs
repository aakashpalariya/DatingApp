using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret()
        {
            return "secret data";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var data = _context.Users.Find(-1);
            if(data == null) return NotFound();
            return data;
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var data = _context.Users.Find(-1);
            
            var dataToReturn = data.ToString();

            return dataToReturn;
        }

        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest()
        {
            return BadRequest("this is bad request..");
        }
        
    }
}
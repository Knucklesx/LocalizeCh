using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalizeApi.Data;
using LocalizeApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace LocalizeApi.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly LocalizeContext _localizeContext;

        public UsersController(LocalizeContext localizeContext)
        {
            _localizeContext = localizeContext;
        }

        //GET api/users
        [HttpGet]
        public ActionResult<IEnumerable<Usuário>> Get()
        {
            var users = _localizeContext.Users.ToList();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public ActionResult<Usuário> Get(int id)
        {
            var user = _localizeContext.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //POST api/users
        [HttpPost]
        public ActionResult Post([FromBody] Usuário user)
        {
            var userExists = _localizeContext.Users.FirstOrDefault((u) => u.Email == user.Email);
            if (userExists != null)
            {
                return Conflict(new { message = "Este e-mail já está cadastrado" });
            }
            _localizeContext.Users.Add(user);
            _localizeContext.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);
        }

        //PUT api/users/{id}
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Usuário user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _localizeContext.SaveChanges();
            // return Ok();
            return NoContent();
        }

        //DELETE api/users/{id}
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var user = _localizeContext.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            _localizeContext.Users.Remove(user);
            _localizeContext.SaveChanges();
            // return Ok();
            return NoContent();

        }

    }
}
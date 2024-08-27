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
    public class ClienteController : ControllerBase
    {
        private readonly LocalizeContext _localizeContext;


        public ClienteController(LocalizeContext localizeContext)
        {
            _localizeContext = localizeContext;
        }


        //GET api/client
        [HttpGet]
        public ActionResult<IEnumerable<Cliente>> Get()
        {
            var clientes = _localizeContext.Clients.ToList();
            return Ok(clientes);
        }


        [HttpGet("{id}")]
        public ActionResult<Cliente> Get(int id)
        {

            var cliente = _localizeContext.Clients.FirstOrDefault(c => c.Id == id);
            if (cliente == null)
            {

                return NotFound();
            }


            return Ok(cliente);
        }

        //POST api/client
        [HttpPost]
        public ActionResult Post([FromBody] Cliente cliente)
        {


            _localizeContext.Clients.Add(cliente);
            _localizeContext.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = cliente.Id }, cliente);
        }

        //PUT api/client/{id}
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Cliente cliente)
        {
            if (id != cliente.Id)
            {
                return BadRequest();
            }

            _localizeContext.SaveChanges();

            return NoContent();
        }

        //DELETE api/client/{id}
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            //    _localizeContext.Clientes.Remove();
            _localizeContext.SaveChanges();
            return NoContent();
        }
    }

}
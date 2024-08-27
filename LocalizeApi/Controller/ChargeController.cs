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
    public class ChargeController : ControllerBase
    {
        private readonly LocalizeContext _localizeContext;


        public ChargeController(LocalizeContext localizeContext)
        {
            _localizeContext = localizeContext;
        }


        //GET api/charge
        [HttpGet]
        public ActionResult<IEnumerable<Cobrança>> Get()
        {
            var charge = _localizeContext.Charge.ToList();
            return Ok(charge);
        }


        [HttpGet("{id}")]
        public ActionResult<Cobrança> Get(int id)
        {

            var charge = _localizeContext.Charge.FirstOrDefault(c => c.Id == id);
            if (charge == null)
            {

                return NotFound();
            }


            return Ok(charge);
        }

        //POST api/charge
        [HttpPost]
        public ActionResult Post([FromBody] Cobrança charge)
        {


            _localizeContext.Charge.Add(charge);
            _localizeContext.SaveChanges();
            return CreatedAtAction(nameof(Get), new { id = charge.Id }, charge);
        }

        //PUT api/charge/{id}
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Cobrança charge)
        {
            if (id != charge.Id)
            {
                return BadRequest();
            }

            _localizeContext.SaveChanges();

            return NoContent();
        }

        //DELETE api/charge/{id}
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var charge = _localizeContext.Charge.FirstOrDefault(c => c.Id == id);
            if (charge == null)
            {
                return NotFound();
            }

            _localizeContext.SaveChanges();
            return NoContent();
        }
    }

}
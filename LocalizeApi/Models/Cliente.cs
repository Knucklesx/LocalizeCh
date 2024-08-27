using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LocalizeApi.Models
{
    public class Cliente
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public required string Nome { get; set; }
        [Required]
        public required string Documento { get; set; }
        [Required]
        public required string Telefone { get; set; }
        [Required]
        public required string Endereço { get; set; }
        public virtual ICollection<Cobrança> Cobranças { get; set; } = new List<Cobrança>();
        public int UsuárioId { get; set; }
        public virtual Usuário Usuário { get; set; } = null!;

        public Cliente() { }
    }

}
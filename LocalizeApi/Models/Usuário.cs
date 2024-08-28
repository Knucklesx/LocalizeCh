using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LocalizeApi.Models
{
    public class Usuário
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public required string Nome { get; set; }
        [Required]
        public required string Email { get; set; }
        [Required]
        public required string Senha { get; set; }

        public virtual ICollection<Cliente> Clientes { get; } = [];
    }
}
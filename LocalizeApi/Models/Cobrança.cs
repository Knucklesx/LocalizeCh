using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace LocalizeApi.Models
{
    public class Cobrança
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public required string Descrição { get; set; }
        [Required]
        public required decimal Valor { get; set; }
        [Required]
        public required DateTime Data { get; set; }
        [Required]
        public required bool Pago { get; set; }
        public int ClienteId { get; set; }
        public virtual Cliente Cliente { get; set; } = null!;
    }
}
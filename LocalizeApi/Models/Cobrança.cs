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
        public required string Description { get; set; }
        [Required]
        public required decimal Value { get; set; }
        [Required]
        public required DateTime Data_Vencimento { get; set; }
        [Required]
        public required bool Pago { get; set; }

        public int ClienteId { get; set; }
        // public virtual Cliente Cliente { get; set; } = null!;
    }
}
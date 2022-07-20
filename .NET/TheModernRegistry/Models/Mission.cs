using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TheModernRegistry.Models
{
    public class Mission
    {
        [Required]
        [Key]
        public Guid Id { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Status { get; set; }
        [ForeignKey("id")]
        public Guid? ParentId { get; set; }
    }
}

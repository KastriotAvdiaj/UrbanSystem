using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApi.Models.Entities;

public class Setting
{
    [Key]
    public int Id { get; set; }

    /// <summary>
    /// Unique setting key (e.g. "smtp.host", "app.theme").
    /// </summary>
    [Required]
    [MaxLength(200)]
    public string Key { get; set; } = string.Empty;

    [Required]
    [Column(TypeName = "nvarchar(max)")]
    public string Value { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }

    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
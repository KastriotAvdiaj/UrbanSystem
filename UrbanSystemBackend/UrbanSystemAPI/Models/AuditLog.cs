using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApi.Models.Entities;

public class AuditLog
{
    [Key]
    public int Id { get; set; }

    /// <summary>
    /// Nullable — allows logging actions for unauthenticated/system requests.
    /// </summary>
    public int? UserId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Action { get; set; } = string.Empty;

    /// <summary>
    /// The name of the entity/table affected (e.g. "User", "Order").
    /// </summary>
    [Required]
    [MaxLength(100)]
    public string Entity { get; set; } = string.Empty;

    /// <summary>
    /// The primary key of the affected entity record.
    /// </summary>
    public int? EntityId { get; set; }

    /// <summary>
    /// JSON snapshot of the entity before the change.
    /// </summary>
    [Column(TypeName = "nvarchar(max)")]
    public string? OldValue { get; set; }

    /// <summary>
    /// JSON snapshot of the entity after the change.
    /// </summary>
    [Column(TypeName = "nvarchar(max)")]
    public string? NewValue { get; set; }

    [MaxLength(45)] // Supports both IPv4 and IPv6
    public string? IpAddress { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    [ForeignKey(nameof(UserId))]
    public User? User { get; set; }
}
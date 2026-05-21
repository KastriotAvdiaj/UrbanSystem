using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApi.Models.Entities;

public class File
{
    [Key]
    public int Id { get; set; }

    /// <summary>
    /// The name of the entity this file belongs to (e.g. "User", "Product").
    /// </summary>
    [Required]
    [MaxLength(100)]
    public string Entity { get; set; } = string.Empty;

    /// <summary>
    /// The primary key of the entity record this file is attached to.
    /// </summary>
    public int EntityId { get; set; }

    [Required]
    [MaxLength(255)]
    public string FileName { get; set; } = string.Empty;

    [Required]
    [MaxLength(1000)]
    public string FilePath { get; set; } = string.Empty;

    /// <summary>
    /// File size in bytes.
    /// </summary>
    public long FileSize { get; set; }

    [Required]
    public int UploadedBy { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    [ForeignKey(nameof(UploadedBy))]
    public User Uploader { get; set; } = null!;

    // Computed helpers (not mapped to DB)
    [NotMapped]
    public string FileSizeFormatted => FileSize switch
    {
        < 1_024 => $"{FileSize} B",
        < 1_048_576 => $"{FileSize / 1_024.0:F1} KB",
        < 1_073_741_824 => $"{FileSize / 1_048_576.0:F1} MB",
        _ => $"{FileSize / 1_073_741_824.0:F1} GB"
    };
}
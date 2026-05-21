using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyApi.Models.Entities;

/// <summary>
/// Join table for the many-to-many relationship between Roles and Permissions.
/// </summary>
public class RolePermission
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int RoleId { get; set; }

    [Required]
    public int PermissionId { get; set; }

    // Navigation properties
    [ForeignKey(nameof(RoleId))]
    public Role Role { get; set; } = null!;

    [ForeignKey(nameof(PermissionId))]
    public Permission Permission { get; set; } = null!;
}
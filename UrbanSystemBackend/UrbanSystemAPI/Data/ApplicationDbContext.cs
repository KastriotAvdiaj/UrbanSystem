using Microsoft.EntityFrameworkCore;
using MyApi.Models.Entities;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace MyApi.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Role> Roles => Set<Role>();
    public DbSet<UserRole> UserRoles => Set<UserRole>();
    public DbSet<RefreshToken> RefreshTokens => Set<RefreshToken>();
    public DbSet<Permission> Permissions => Set<Permission>();
    public DbSet<RolePermission> RolePermissions => Set<RolePermission>();
    public DbSet<AuditLog> AuditLogs => Set<AuditLog>();
    public DbSet<Notification> Notifications => Set<Notification>();
    public DbSet<Setting> Settings => Set<Setting>();
    public DbSet<Models.Entities.File> Files => Set<Models.Entities.File>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Apply all IEntityTypeConfiguration<T> classes from this assembly
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        // ── Users ────────────────────────────────────────────────────────────
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasIndex(u => u.Email).IsUnique();
        });

        // ── UserRoles (many-to-many) ──────────────────────────────────────────
        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.HasIndex(ur => new { ur.UserId, ur.RoleId }).IsUnique();

            entity.HasOne(ur => ur.User)
                  .WithMany(u => u.UserRoles)
                  .HasForeignKey(ur => ur.UserId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(ur => ur.Role)
                  .WithMany(r => r.UserRoles)
                  .HasForeignKey(ur => ur.RoleId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ── RolePermissions (many-to-many) ────────────────────────────────────
        modelBuilder.Entity<RolePermission>(entity =>
        {
            entity.HasIndex(rp => new { rp.RoleId, rp.PermissionId }).IsUnique();

            entity.HasOne(rp => rp.Role)
                  .WithMany(r => r.RolePermissions)
                  .HasForeignKey(rp => rp.RoleId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(rp => rp.Permission)
                  .WithMany(p => p.RolePermissions)
                  .HasForeignKey(rp => rp.PermissionId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ── RefreshTokens ─────────────────────────────────────────────────────
        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasIndex(rt => rt.TokenHash).IsUnique();

            entity.HasOne(rt => rt.User)
                  .WithMany(u => u.RefreshTokens)
                  .HasForeignKey(rt => rt.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ── AuditLogs ─────────────────────────────────────────────────────────
        modelBuilder.Entity<AuditLog>(entity =>
        {
            // UserId is nullable — no cascade delete so logs are preserved
            entity.HasOne(al => al.User)
                  .WithMany(u => u.AuditLogs)
                  .HasForeignKey(al => al.UserId)
                  .OnDelete(DeleteBehavior.SetNull);
        });

        // ── Notifications ─────────────────────────────────────────────────────
        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasOne(n => n.User)
                  .WithMany(u => u.Notifications)
                  .HasForeignKey(n => n.UserId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ── Settings ──────────────────────────────────────────────────────────
        modelBuilder.Entity<Setting>(entity =>
        {
            entity.HasIndex(s => s.Key).IsUnique();
        });

        // ── Files ─────────────────────────────────────────────────────────────
        modelBuilder.Entity<Models.Entities.File>(entity =>
        {
            // Composite index for efficient "get all files for entity X" queries
            entity.HasIndex(f => new { f.Entity, f.EntityId });

            entity.HasOne(f => f.Uploader)
                  .WithMany(u => u.Files)
                  .HasForeignKey(f => f.UploadedBy)
                  .OnDelete(DeleteBehavior.Restrict); // Preserve files if user is deleted
        });
    }

    /// <summary>
    /// Automatically updates <see cref="User.UpdatedAt"/> and <see cref="Setting.UpdatedAt"/>
    /// on every SaveChanges call.
    /// </summary>
    public override int SaveChanges()
    {
        UpdateTimestamps();
        return base.SaveChanges();
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        UpdateTimestamps();
        return base.SaveChangesAsync(cancellationToken);
    }

    private void UpdateTimestamps()
    {
        var now = DateTime.UtcNow;

        foreach (var entry in ChangeTracker.Entries<User>()
                     .Where(e => e.State == EntityState.Modified))
        {
            entry.Entity.UpdatedAt = now;
        }

        foreach (var entry in ChangeTracker.Entries<Setting>()
                     .Where(e => e.State is EntityState.Modified or EntityState.Added))
        {
            entry.Entity.UpdatedAt = now;
        }
    }
}
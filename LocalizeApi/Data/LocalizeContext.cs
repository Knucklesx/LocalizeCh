using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LocalizeApi.Models;
using Microsoft.EntityFrameworkCore;

namespace LocalizeApi.Data
{
    public class LocalizeContext : DbContext
    {
        public LocalizeContext(DbContextOptions<LocalizeContext> options)
            : base(options)
        {
            DotNetEnv.Env.Load();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Cobrança>(entity =>
            {
                entity.Property(e => e.Value).HasColumnType("decimal(18, 2)");
            });
        }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
            optionsBuilder
                .UseSqlServer(connectionString)
                .UseLazyLoadingProxies();
        }

        public DbSet<Cliente> Clients { get; set; }
        public DbSet<Cobrança> Charge { get; set; }
        public DbSet<Usuário> Users { get; set; }



    }
}
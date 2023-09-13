using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GotIt_back.Migrations
{
    /// <inheritdoc />
    public partial class NextRepetTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "NextRepeatTime",
                table: "Repeats",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NextRepeatTime",
                table: "Repeats");
        }
    }
}

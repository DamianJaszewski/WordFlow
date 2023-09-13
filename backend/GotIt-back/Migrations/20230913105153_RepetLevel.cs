using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GotIt_back.Migrations
{
    /// <inheritdoc />
    public partial class RepetLevel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RepetLevel",
                table: "Repeats",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RepetLevel",
                table: "Repeats");
        }
    }
}

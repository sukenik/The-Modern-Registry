using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheModernRegistry.Data.Migrations
{
    public partial class removedRedundantProps : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Missions_Missions_ParentId",
                table: "Missions");

            migrationBuilder.DropIndex(
                name: "IX_Missions_ParentId",
                table: "Missions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Missions_ParentId",
                table: "Missions",
                column: "ParentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Missions_Missions_ParentId",
                table: "Missions",
                column: "ParentId",
                principalTable: "Missions",
                principalColumn: "Id");
        }
    }
}

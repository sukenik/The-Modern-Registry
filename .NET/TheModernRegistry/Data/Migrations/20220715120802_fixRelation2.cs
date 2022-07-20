using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TheModernRegistry.Data.Migrations
{
    public partial class fixRelation2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Missions_Missions_MissionId",
                table: "Missions");

            migrationBuilder.DropIndex(
                name: "IX_Missions_MissionId",
                table: "Missions");

            migrationBuilder.DropColumn(
                name: "MissionId",
                table: "Missions");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Missions_Missions_ParentId",
                table: "Missions");

            migrationBuilder.DropIndex(
                name: "IX_Missions_ParentId",
                table: "Missions");

            migrationBuilder.AddColumn<Guid>(
                name: "MissionId",
                table: "Missions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Missions_MissionId",
                table: "Missions",
                column: "MissionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Missions_Missions_MissionId",
                table: "Missions",
                column: "MissionId",
                principalTable: "Missions",
                principalColumn: "Id");
        }
    }
}

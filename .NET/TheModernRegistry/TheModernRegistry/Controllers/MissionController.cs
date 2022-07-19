using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TheModernRegistry.Data;
using TheModernRegistry.Models;

namespace TheModernRegistry.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionController : ControllerBase
    {
        private readonly MissionDbContext _context;

        public MissionController(MissionDbContext context) => _context = context;

        [HttpGet]
        public async Task<IEnumerable<Mission>> Get() => await _context.Missions.ToListAsync();

        [HttpGet("{description}")]
        [ProducesResponseType(typeof(Mission), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetByDescription(string description)   
        {
            var mission = await _context.Missions.SingleOrDefaultAsync(mission => mission.Description == description);
            return mission == null ? NotFound() : Ok(mission);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> Create(Mission mission)
        {
            await _context.Missions.AddAsync(mission);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetByDescription), new { Description = mission.Description }, mission);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Update(Guid id, Mission mission)
        {
            if (id != mission.Id) return BadRequest();

            _context.Entry(mission).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> Delete(Guid id)
        {
            var missionToDelete = await _context.Missions.FindAsync(id);
            if (missionToDelete == null) return NotFound();

            _context.Missions.Remove(missionToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> DeleteMissionChildren(List<Guid> childrenIds)
        {
            var missionsToDelete = _context.Missions.Where(m => childrenIds.Contains(m.Id));
            _context.Missions.RemoveRange(missionsToDelete);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> PassMissionParent(Guid id, [FromBody] PassMissionParentBody BodyParentId)
        {
            var missionsToUpdate = _context.Missions.Where(m => m.ParentId == id).Select(
                m => new Mission { 
                    Id = m.Id, 
                    Description = m.Description, 
                    Status = m.Status,
                    ParentId = BodyParentId.parentId
                }
            );
            _context.Missions.UpdateRange(missionsToUpdate);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        public class PassMissionParentBody
        {
            public Guid? parentId { get; set; }
        }
    }
}

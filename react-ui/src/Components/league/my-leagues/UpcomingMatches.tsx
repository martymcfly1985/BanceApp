import { Button, Card, Tooltip } from "antd";
import { IUserLeagueData } from "../../../Models/UserLeagueData";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

interface UpcomingMatchesProps {
  selectedLeague: IUserLeagueData;
}

function UpcomingMatches({
  selectedLeague
} : UpcomingMatchesProps) {
  const canScheduleMatches = () => {return (selectedLeague?.leagueMember.role === 'Owner' || selectedLeague?.leagueMember.role === 'Moderator') && selectedLeague.league.recnum !== 0;}

  return (
    <>
      <Tooltip
        title={!canScheduleMatches() ? 'You must be a moderator or owner to schedule matches.' : undefined}
        >
        <Button
          style={{marginBottom:'20px'}}
          disabled={!canScheduleMatches()}
          type='primary'
          onClick={() => {
            console.log('Match Scheduled');
          }}
        >
          Schedule a Match
        </Button>
      </Tooltip>
      <DragDropContext onDragEnd={() => {
        console.log('drug');
      }}>
        <Droppable droppableId={'Card'}>
          <Card>
            
          </Card>
        </Droppable>>
      </DragDropContext>
    </>
  )
}

export default UpcomingMatches
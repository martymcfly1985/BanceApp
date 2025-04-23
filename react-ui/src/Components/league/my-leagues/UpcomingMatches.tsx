import { Button, Card, Col, DatePicker, Form, Modal, Row, Select, Tooltip, TreeSelect } from "antd";
import { IUserLeagueData } from "../../../Models/UserLeagueData";

interface UpcomingMatchesProps {
  selectedLeague: IUserLeagueData;
}

function UpcomingMatches({
  selectedLeague
} : UpcomingMatchesProps) {
  const canScheduleMatches = () => {return (selectedLeague?.leagueMember.role === 'Owner' || selectedLeague?.leagueMember.role === 'Moderator') && selectedLeague.league.recnum !== 0;}
const disabledTimes = () => ({
    disabledHours: () => {return [11,12]}
})
  
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
      <Modal 
        open={true}
        title={'Schedule a Match'}
        width={'65%'}
        centered={true}
      >
        <Form
          layout="vertical"
        >
          <Row
            gutter={[12,8]}
          >
            <Col
              span={12}
            >
              <Form.Item
                label={'Match Location and Court:'}
              >
                <TreeSelect
                  style={{width:'100%'}}
                >
                </TreeSelect>
              </Form.Item>
            </Col>
            <Col
              span={12}
            >
              <Form.Item
                label={'Match Date and Time:'}
              >
                <DatePicker
                  showTime={{
										use12Hours: true,
										format:"h:mm a",
										minuteStep: 15,
                    disabledTime: disabledTimes()
                  }}
                  style={{width:'100%'}}
                >
                </DatePicker>
              </Form.Item>
            </Col>
            <Col  
              span={12}
            >
              <Card
                title={'Team 1'}
              >
                <Form.Item>
                  <Select
                    mode="multiple"
                    style={{width:'100%'}}
                  >
                  </Select>
                </Form.Item>
              </Card>
            </Col>
            <Col
              span={12}
            >
              <Card
                title={'Team 2'}
              >
                <Form.Item>
                  <Select
                    mode="multiple"
                    style={{width:'100%'}}
                  >
                  </Select>
                </Form.Item>
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  )
}

export default UpcomingMatches
import { Button, Card, Col, DatePicker, Form, Modal, Row, Select, Tooltip, TreeSelect } from "antd";
import { IUserLeagueData } from "../../../Models/UserLeagueData";
import { useEffect, useState } from "react";
import { DefaultOptionType } from "antd/es/cascader";

interface UpcomingMatchesProps {
  selectedLeague: IUserLeagueData;
}

function UpcomingMatches({
  selectedLeague
} : UpcomingMatchesProps) {
  const canScheduleMatches = () => {return (selectedLeague?.leagueMember.role === 'Owner' || selectedLeague?.leagueMember.role === 'Moderator') && selectedLeague.league.recnum !== 0;}
  const [teamAMembers, setTeamAMembers] = useState<DefaultOptionType[]>([]);
  const [teamBMembers, setTeamBMembers] = useState<DefaultOptionType[]>([]);
  const [locationValue, setLocationValue] = useState<number>();

  const onMatchLocationChange = (newValue: number) => {
    setLocationValue(newValue);
    console.log(newValue);
  };

  const leagueMembers:DefaultOptionType[] = [
    {
      value: 1000,
      label: 'Lance'
    },
    {
      value: 1001,
      label: 'Ben'
    }
  ];

  const onTeamAMemberChange = (recnums: number[]) => {
    setTeamBMembers(
      leagueMembers.filter((member) => {
        return !recnums.includes(Number(member.value))
      })
    )
  }

  const onTeamBMemberChange = (recnums: number[]) => {
    setTeamAMembers(
      leagueMembers.filter((member) => {
        return !recnums.includes(Number(member.value))
      })
    )
  }

  useEffect(() => {
    setTeamAMembers(leagueMembers)
    setTeamBMembers(leagueMembers)
  }, [])

  const leagueLocations = [
    {
      value: 'parent 1',
      title: 'parent 1',
      selectable: false,
      children: [
        {
          value: 1,
          title: 'leaf1',
        },
        {
          value: 2,
          title: 'leaf2',
        },
        {
          value: 3,
          title: 'leaf3',
        },
        {
          value: 4,
          title: 'leaf4',
        },
        {
          value: 5,
          title: 'leaf5',
        },
        {
          value: 6,
          title: 'leaf6',
        },
      ],
    },
    {
      value: 'parent 1-1',
      title: 'parent 1-1',
      selectable: false,
      children: [
        {
          value: 'leaf11',
          title: 'leaf11',
        },
      ],
    },
  ];

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
                  onChange={onMatchLocationChange}
                  value={locationValue}
                  allowClear
                  treeDefaultExpandAll
                  treeData={leagueLocations}
                  showSearch
                  treeNodeFilterProp='title'
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
                    disabledTime: () => {
                      return {
                        disabledHours: () => {
                          return [11, 12]
                        }
                      }
                    }
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
                title={'Team A'}
              >
                <Form.Item>
                  <Select
                    mode="multiple"
                    style={{width:'100%'}}
                    options={teamAMembers}
                    onChange={onTeamAMemberChange}
                  >
                  </Select>
                </Form.Item>
              </Card>
            </Col>
            <Col
              span={12}
            >
              <Card
                title={'Team B'}
              >
                <Form.Item>
                  <Select
                    mode="multiple"
                    style={{width:'100%'}}
                    options={teamBMembers}
                    onChange={onTeamBMemberChange}
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
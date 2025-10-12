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
  const [scheduleMatchModalVisible, setScheduleMatchModalVisible] = useState(false);
  const [teamAMembersList, setTeamAMembersList] = useState<DefaultOptionType[]>([]);
  const [teamBMembersList, setTeamBMembersList] = useState<DefaultOptionType[]>([]);
  const [locationValue, setLocationValue] = useState<number>();
  const [selectedTeamAMembers, setSelectedTeamAMembers] = useState<number[]>([]);
  const [selectedTeamBMembers, setSelectedTeamBMembers] = useState<number[]>([]);

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
    setSelectedTeamAMembers(recnums);
    setTeamBMembersList(
      leagueMembers.filter((member) => {
        return !recnums.includes(Number(member.value));
      })
    );
  }

  const onTeamBMemberChange = (recnums: number[]) => {
    setSelectedTeamBMembers(recnums);
    setTeamAMembersList(
      leagueMembers.filter((member) => {
        return !recnums.includes(Number(member.value))
      })
    );
  }

  const handleScheduleMatchModalClose = () => {
    setSelectedTeamAMembers([]);
    setSelectedTeamBMembers([]);
    setTeamAMembersList(leagueMembers);
    setTeamBMembersList(leagueMembers);
    setScheduleMatchModalVisible(false);
  }

  useEffect(() => {
    setTeamAMembersList(leagueMembers);
    setTeamBMembersList(leagueMembers);
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
            setScheduleMatchModalVisible(true);
          }}
        >
          Schedule a Match
        </Button>
      </Tooltip>
      <Modal 
        open={scheduleMatchModalVisible}
        title={'Schedule a Match'}
        width={'65%'}
        centered={true}
        onCancel={() => {
          handleScheduleMatchModalClose();
        }}
        closable={false}
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
                    value={selectedTeamAMembers}
                    mode="multiple"
                    style={{width:'100%'}}
                    options={teamAMembersList}
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
                    value={selectedTeamBMembers}                  
                    mode="multiple"
                    style={{width:'100%'}}
                    options={teamBMembersList}
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
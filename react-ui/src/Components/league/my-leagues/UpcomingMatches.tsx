import { Button, Card, Col, DatePicker, Form, message, Modal, Row, Select, Tooltip, TreeSelect } from "antd";
import { IUserLeagueData } from "../../../Models/UserLeagueData";
import { useEffect, useState } from "react";
import { DefaultOptionType } from "antd/es/cascader";
import { getMasterLeagueIndex } from "../../../BusinessLogic/leagueActions";
import { IMasterLeagueIndex } from "../../../Models/MasterLeagueIndex";

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
  const [leagueMembers, setLeagueMembers] = useState<DefaultOptionType[]>([]);
  const [leagueLocations, setLeagueLocations] = useState<DefaultOptionType[]>([]);
  const [masterLeagueIndex, setMasterLeagueIndex] = useState<IMasterLeagueIndex>();

  const onMatchLocationChange = (newValue: number) => {
    setLocationValue(newValue);
    console.log(newValue);
  };

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
    async function fetch() {
      try {
        const mli = await getMasterLeagueIndex(selectedLeague.league.recnum!);
        setMasterLeagueIndex(mli);
        const members:DefaultOptionType[] = mli.members.map((member) => {
          return {
            value: member.recnum,
            label: `${member.firstName} ${member.lastName}`
          };
        })
        setLeagueMembers(members);
        setTeamAMembersList(members);
        setTeamBMembersList(members);

        const locations:DefaultOptionType[] = mli.locations.map((location) => {
          return {
            value: location.recnum,
            title: location.name,
            selectable: false,
            children: location.courts.map((court) => {
              return {
                value: court.recnum,
                title: court.name
              }
            })
          };
        })
        setLeagueLocations(locations);
      } catch {
        message.error("Unable to obtain league information.");
      }
    }
    fetch();
  }, [])

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
                    maxCount={2}
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
                    maxCount={2}
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
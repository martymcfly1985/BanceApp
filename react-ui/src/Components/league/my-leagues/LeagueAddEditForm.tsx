import { Button, Form, Input, message, Switch } from "antd";
import { ILeague } from "../../../Models/League";
import { insertLeagueData, updateLeague } from "../../../BusinessLogic/leagueActions";
import { IUserLeagueData } from "../../../Models/UserLeagueData";

interface LeagueAddEditFormProps {
  selectedLeague: IUserLeagueData;
  onSuccessfulLeagueUpdate(updatedLeague: ILeague): void;
  onSuccessfulLeagueInsert(insertedLeagueData: IUserLeagueData): void;
}

function LeagueAddEditForm({
  selectedLeague,
  onSuccessfulLeagueUpdate,
  onSuccessfulLeagueInsert
} : LeagueAddEditFormProps) {
  const canEditLeague = () => {return selectedLeague?.leagueMember.role === 'Owner';}
  return (
    <Form
      id='LeagueForm'
      initialValues={{ name: selectedLeague?.league.name, public: selectedLeague?.league.public, joinable: selectedLeague?.league.joinable, playtime: selectedLeague?.league.playtime, city: selectedLeague?.league.city, state: selectedLeague?.league.state }}
      layout={'vertical'}
      disabled={!canEditLeague()}
      onFinish={async (values: ILeague) => {
          if (selectedLeague.league.recnum === 0) {
            try {
              const leagueDataToInsert: IUserLeagueData = {
                league: values,
                leagueMember: selectedLeague.leagueMember
              }
              const insertedLeagueData = await insertLeagueData(leagueDataToInsert);
              message.success('League successfully created!');  
              onSuccessfulLeagueInsert(insertedLeagueData);
            } catch {
              message.error('Unable to create the league. Please try again later.');
            }
          } else {
            try {
              const updatedLeague: ILeague = {
                ...values,
                recnum: selectedLeague?.league.recnum
              }
              await updateLeague(updatedLeague);
              message.success('League information updated successfully!');  
              onSuccessfulLeagueUpdate(updatedLeague);
            } catch {
              message.error('Unable to update league information. Please try again later.');
            }
          }
        }
      }
    >
      <Form.Item 
        label={'League Name:'}
        name={'name'}
        rules={[
          { required: true, message: 'Please enter a league name.' },
          { whitespace: true, message: 'Please enter a league name.' }
        ]}
      >
        <Input
          placeholder='League Name'
        />
      </Form.Item>
      <Form.Item 
        label={'Public:'}
        name={'public'}
      >
        <Switch
          checkedChildren='Yes' unCheckedChildren='No'
        />
      </Form.Item>
      <Form.Item 
        label={'Joinable:'}
        name={'joinable'}
      >
        <Switch
          checkedChildren='Yes' unCheckedChildren='No'
        />
      </Form.Item>
      <Form.Item 
        label={'City:'}
        name={'city'}
        rules={[
          { required: true, message: 'Please enter a city.' },
          { whitespace: true, message: 'Please enter a city.' }
        ]}
      >
        <Input
          placeholder='City'
        />
      </Form.Item>
      <Form.Item 
        label={'State:'}
        name={'state'}
        rules={[
          { required: true, message: 'Please enter a state.' },
          { whitespace: true, message: 'Please enter a state.' }
        ]}
      >
        <Input
          placeholder='State'
        />
      </Form.Item>
      <Form.Item 
        label={'Playtime:'}
        name={'playtime'}
        rules={[
          { required: true, message: 'Please enter a playtime description.' },
          { whitespace: true, message: 'Please enter a playtime description.' }
        ]}
      >
        <Input
          placeholder='Playtime'
        />
      </Form.Item>
      <Button
        form='LeagueForm'
        type='primary'
        htmlType='submit'
        hidden={!canEditLeague()}
      >
        Save Changes
      </Button>
    </Form>
  )
}

export default LeagueAddEditForm
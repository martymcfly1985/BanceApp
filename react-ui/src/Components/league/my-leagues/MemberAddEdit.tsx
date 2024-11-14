import { Form, message, Modal, Select, SelectProps, Switch } from "antd";
import { ILeagueMember, LeagueRoleEnum } from "../../../Models/LeagueMember";
import { useState } from "react";
import { saveLeagueMember } from "../../../BusinessLogic/leagueActions";
import { searchUsersNotInLeague } from "../../../BusinessLogic/userActions";
const { Option } = Select;

interface MemberAddEditProps {
  leagueRecnum: number,
  open: boolean,
  title: string,
  onSuccess(savedLeagueMember: ILeagueMember) : void,
  onCancel() : void;
}

function MemberAddEdit({
  leagueRecnum,
  open,
  title,
  onSuccess,
  onCancel
} : MemberAddEditProps) {
  const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
  const [matchingUsers, setMatchingUsers] = useState<SelectProps['options']>([]);
  const [selectedUserRecnum, setSelectedUserRecnum] = useState<string>();
  let timeout: ReturnType<typeof setTimeout> | null;
  let currentValue: string;

  const onSubmit = async (values: any) => {
    try {
      setSubmitButtonLoading(true);
      const savedLeagueMember = await saveLeagueMember(leagueRecnum, Number(selectedUserRecnum), values.leagueRole, values.sub);
      setSubmitButtonLoading(false);
      setMatchingUsers([]);
      onSuccess(savedLeagueMember);
    } catch {
      message.error("Unable to save league member.");
      setSubmitButtonLoading(false);
    }
  }

  const fetch = (searchString: string, callback: (data: { value: number; text: string }[]) => void) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = searchString;
  
    const search = async () => {
      await searchUsersNotInLeague(searchString, leagueRecnum)
        .then((userSearchResults) => {
          if (currentValue === searchString) {
            const data = userSearchResults.map((user) => ({
              value: user.recnum!,
              text: `${user.firstName} ${user.lastName}`,
            }));
  
            callback(data);
          }
        });
    };
    if (searchString) {
      timeout = setTimeout(search, 300);
    } else {
      callback([]);
    }
  };

  const handleSearch = (newValue: string) => {
    fetch(newValue, setMatchingUsers);
  };
  
  const handleChange = (newValue: string) => {
    setSelectedUserRecnum(newValue);
  };

  
  return (
    <Modal
        open={open}
        onCancel={() => {
          onCancel();
          setSelectedUserRecnum(undefined);
          setMatchingUsers([]);
        }}
        centered
        title={title}
        closeIcon={false}
        maskClosable={false}
        okButtonProps={{
          loading: submitButtonLoading,
          form: 'AddEditMemberForm',
          htmlType: 'submit'
        }}
        destroyOnClose
      >
        <Form
          layout='vertical'
          id='AddEditMemberForm'
          initialValues={{leagueRole: LeagueRoleEnum.Member}}
          onFinish={(values) => {
            onSubmit(values);
          }}
        >
          <Form.Item
            label={'User:'}
            name={'user'}
            id='user'
            required={true}
            rules={[
              { required: true, message: 'Please select a user.' }
            ]}
          >
            <Select
              showSearch
              value={selectedUserRecnum}
              placeholder={'Search for users by name, email, or username.'}
              defaultActiveFirstOption={false}
              suffixIcon={null}
              filterOption={false}
              onSearch={handleSearch}
              onChange={handleChange}
              notFoundContent={null}
            >
              {(matchingUsers || []).map((d, index) => {
                return (
                  <Option
                    value={d.value}
                    key={index}
                  >
                    {d.text}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item
            label={'League Role:'}
            name={'leagueRole'}
            id='leagueRole'
          >
            <Select
              options={
                Object.values(LeagueRoleEnum).map((leagueRole) => {
                  return ({
                    value: leagueRole,
                    label: leagueRole
                  });
                })}
            />
          </Form.Item>
          <Form.Item
            label={'Is this player a sub?:'}
            name={'sub'}
            id='sub'
          >
            <Switch
              checkedChildren={'Yes'}
              unCheckedChildren={'No'}
            />
          </Form.Item>
        </Form>
      </Modal>
  );
}

export default MemberAddEdit;
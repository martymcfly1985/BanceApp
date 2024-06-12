import { Form, Select } from "antd";
import { City } from "country-state-city";
import { useState } from "react";

interface CityStateFormItemProps {
  cityLabel?: string | undefined,
  stateLabel?: string | undefined
}

function CityStateFormItem({
  cityLabel,
  stateLabel,
  ...props
}: CityStateFormItemProps & React.ComponentProps<typeof Form.Item>) {
  const intialCityList: any[] = []
  const [citiesList, setCitiesList] = useState(intialCityList);
  const populateCitySelect = (state: string) => {
    const cities = City.getCitiesOfState('US', state);
    const citiesList = cities.map((city) => {
      return { value: city.name, label: city.name }
    })
    setCitiesList(citiesList)
  }
  return(
    <>
      <Form.Item
        label={stateLabel}
        {...props}
        name='state'
        rules={[
          { required: true, message: 'Please enter your state.' }
        ]}
      >
        <Select
          placeholder='State'
          showSearch={true}
          onChange={(value) => {
            populateCitySelect(value);
          }}
          filterOption={(input, option) => {
            return (
              option !== undefined && option !== null && (option.value.toLowerCase().includes(input.toLowerCase()) ||
              option.label.toLowerCase().includes(input.toLowerCase()))
            );
          }}
          options={[
            { value: 'AL', label: 'Alabama' },
            { value: 'AK', label: 'Alaska' },
            { value: 'AZ', label: 'Arizona' },
            { value: 'AR', label: 'Arkansas' },
            { value: 'CA', label: 'California' },
            { value: 'CO', label: 'Colorado' },
            { value: 'CT', label: 'Connecticut' },
            { value: 'DE', label: 'Delaware' },
            { value: 'FL', label: 'Florida' },
            { value: 'GA', label: 'Georgia' },
            { value: 'HI', label: 'Hawaii' },
            { value: 'ID', label: 'Idaho' },
            { value: 'IL', label: 'Illinois' },
            { value: 'IN', label: 'Indiana' },
            { value: 'IA', label: 'Iowa' },
            { value: 'KS', label: 'Kansas' },
            { value: 'KY', label: 'Kentucky' },
            { value: 'LA', label: 'Louisiana' },
            { value: 'ME', label: 'Maine' },
            { value: 'MD', label: 'Maryland' },
            { value: 'MA', label: 'Massachusetts' },
            { value: 'MI', label: 'Michigan' },
            { value: 'MN', label: 'Minnesota' },
            { value: 'MS', label: 'Mississippi' },
            { value: 'MO', label: 'Missouri' },
            { value: 'MT', label: 'Montana' },
            { value: 'NE', label: 'Nebraska' },
            { value: 'NV', label: 'Nevada' },
            { value: 'NH', label: 'New Hampshire' },
            { value: 'NJ', label: 'New Jersey' },
            { value: 'NM', label: 'New Mexico' },
            { value: 'NY', label: 'New York' },
            { value: 'NC', label: 'North Carolina' },
            { value: 'ND', label: 'North Dakota' },
            { value: 'OH', label: 'Ohio' },
            { value: 'OK', label: 'Oklahoma' },
            { value: 'OR', label: 'Oregon' },
            { value: 'PA', label: 'Pennsylvania' },
            { value: 'RI', label: 'Rhode Island' },
            { value: 'SC', label: 'South Carolina' },
            { value: 'SD', label: 'South Dakota' },
            { value: 'TN', label: 'Tennessee' },
            { value: 'TX', label: 'Texas' },
            { value: 'UT', label: 'Utah' },
            { value: 'VT', label: 'Vermont' },
            { value: 'VA', label: 'Virginia' },
            { value: 'WA', label: 'Washington' },
            { value: 'WV', label: 'West Virginia' },
            { value: 'WI', label: 'Wisconsin' },
            { value: 'WY', label: 'Wyoming' }
          ]}
        />
      </Form.Item>
      <Form.Item
        label={cityLabel}
        {...props}
        name='city'
        rules={[
         { required: true, message: 'Please enter your city.' }
       ]}
      >
        <Select
          placeholder='City'
          showSearch={true}
          options={citiesList}
          disabled={citiesList.length === 0}
        />
      </Form.Item>
  </>
  );
}

export default CityStateFormItem
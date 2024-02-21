import React from 'react'

const MySelect = ({options, defaultValue, value, onChange}) => {
  return (
        <select className="select"
            value={value}
            onChange={event => onChange(event.target.value)}// установка выбранной опции в качестве состояния
        >
            <option disabled value="">{defaultValue}</option>
            {options.map(option => 
                <option value={option.value} key={option.value}>
                    {option.name}
                </option>
            )}
        </select>
  )
}

export default MySelect
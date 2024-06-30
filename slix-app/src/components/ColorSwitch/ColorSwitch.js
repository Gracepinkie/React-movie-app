import React from 'react'
import Switch from '@mui/joy/Switch';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

function ColorSwitch() {
  return (
      <Switch
        color="primary"
        slotProps={{
          track: {
            children: (
              <React.Fragment>
                <span>I</span>
                <span>0</span>
              </React.Fragment>
            ),
            sx: {
              justifyContent: 'space-around',
            },
          },
        }}
        sx={{
          '--Switch-thumbSize': '27px',
          '--Switch-trackWidth': '52px',
          '--Switch-trackHeight': '31px',
        }}
      />
  );
}

export default ColorSwitch
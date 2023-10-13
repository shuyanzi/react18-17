import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import StoreMain from './components/store-com';
import CssCom from './components/css-com';
import FormZod from './components/form-zod';
import './App.css'
import './components/web-component'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [minTitle, setMinTitle] = React.useState('My Mini Program');

  React.useEffect(() => {
    setTimeout(() => {
      setMinTitle('update My Mini Program');
    }, 2000)
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const changeBack = (value: any) => {
    console.log('changeBack:', value);
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Mobx store" {...a11yProps(0)} />
          <Tab label="Css" {...a11yProps(1)} />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="web component" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Mobx store
        <StoreMain />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Css
        <CssCom />
      </TabPanel>
      <TabPanel value={value} index={2}>
        react-hook-form and zod
        <FormZod />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <mini-program onChange={changeBack} dataName="program">
          <h1 slot="title">{minTitle}</h1>
          <p slot="content">
            Hello, this is a simple mini program using Web Components!
          </p>
          <button slot="button">Click Me</button>
        </mini-program>
      </TabPanel>
    </Box>
  );
}
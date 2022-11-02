import { useState, useEffect, ChangeEvent, FC } from 'react';
import { Layout } from "../components/layouts";
import { Card, CardContent, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Props {
    theme: string;
}

const ThemeChangerPage: FC<Props> = ({ theme }) => {
    
  const [currentTheme, setCurrentTheme] = useState('light');
  
  const onThemeChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    const selectedTheme = event.target.value;
    setCurrentTheme( selectedTheme );

    Cookies.set('theme', selectedTheme );
  }

  const onClick = async () => {
    const { data } = await axios.get('/api/hello');
    console.log({ data });
  }

  useEffect(() => {
    
  }, []);
  

  return (
    <Layout>
        <Card>
            <CardContent>
                <FormControl>
                    <FormLabel>Tema</FormLabel>
                    <RadioGroup
                        value={ currentTheme }
                        onChange={ onThemeChange }
                    >
                        <FormControlLabel value='light' control={ <Radio /> } label='Light'></FormControlLabel>
                        <FormControlLabel value='dark' control={ <Radio /> } label='Dark'></FormControlLabel>
                        <FormControlLabel value='custom' control={ <Radio /> } label='Custom'></FormControlLabel>
                    </RadioGroup>
                </FormControl>

                <Button onClick={ onClick }>
                    Solicitud
                </Button>
            </CardContent>
        </Card>
    </Layout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { theme = 'light', name = 'Non name' } = req.cookies;
    
    const validTheme = ['light', 'dark', 'custom'];
    return {
        props: {
            theme: validTheme.includes( theme ) ? theme : 'light',
            name
        }
    }
}

export default ThemeChangerPage;
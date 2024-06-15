import { makeStyles } from '@mui/styles';


export default makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1), width:'40%', marginBottom: '30px',
  },
  selectEmpty: {
    marginTop: theme.spacing(10),
  },
  loading: {
    height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  container: {
    padding: '25px' ,
    backgroundColor: '#f8f8f8'
  },
  marginBottom: {
    marginBottom: '30px',
  },
  list: {
    height: 'calc(100vh - 260px)', // changed to adjust the height of the list container
    overflow: 'auto',
    marginTop:'50px'
  },
}));
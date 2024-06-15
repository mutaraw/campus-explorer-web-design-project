import app from './app/app.js';

const port = 9000;

app.listen(port,()=>{
    console.log(`Server listening at ${port}`);
})
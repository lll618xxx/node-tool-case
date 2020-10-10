const cmd = process.platform == 'win32' ? 'netstat -ano' : 'ps aux';
const exec = require('child_process').exec;
const port = '8080';

exec(cmd, function(err, stdout, stderr) {
    if(err){ return console.log(err); }
    
    stdout.split('\n').filter(function(line){        
        let p = line.trim().split(/\s+/); 
        let address = p[1];        
       
        if (address != undefined) {        
            if (address.split(':')[1] == port){               
                exec('taskkill /F /pid '+p[4], function(err, stdout, stderr){
                    if(err){
                        return console.log(`${port}端口释放失败!!!`);    
                    }
                    console.log(`${port}端口成功释放`);
                });
            }
        }                          
    });
});

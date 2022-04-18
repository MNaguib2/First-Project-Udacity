import fs from "fs";

function getFullNameFile(filename: string): Promise<string> {
    return new Promise((res , rej) => {
         fs.readdir('./assets/full',(err, files) => {
            if (err) {
                rej('Unable to scan directory: ')
            }
             files.forEach((file: string) => {
                if (file.split('.')[0] === filename) {                            
                    return res(file);
                }
            }); 
            rej('No File Found');           
        });
    })
}



export default getFullNameFile;